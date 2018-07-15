const rp = require('request-promise');
const cheerio = require('cheerio');
const db = require('../config/db');
const Golfer = require('../models/golfer');

// Options for request
const options = {
    uri: 'http://www.espn.com/golf/leaderboard?tournamentId=401025221',
    transform: (body) => {
        return cheerio.load(body);
    }
};

// Connect to DB
db(() => {
    // Make the request
    rp(options)
        .then(($) => {
            const tournamentName = "Masters";

            let cutScore;

            // Scrape the page for golfer names and scores
            $('tr.player-overview').each(((i, elem) => {
                const name = $(elem).find('.short-name').text().replace(/  /, ' ');
                let score = parseInt($(elem).find('.relativeScore').text());
                let active = true;

                // Check the next golfer's score - if it's NaN then the current golfer's score
                // is the highest non-cut score so add 1 to that to determine the "cut score"
                if (!isNaN(score) && isNaN(parseInt($(elem).next().find('.relativeScore').text()))) {
                    cutScore = score + 1;
                }

                // If the golfer has been cut or withdrew then assign them the "cut score"
                if (isNaN(score)) {
                    score = cutScore;
                    active = false;
                }

                Golfer.update(
                  { name: name.toUpperCase(), tournament: tournamentName},
                  { score: score, active: active },
                  (err) => {
                    if (err) {
                      console.log(err)
                    }
                  });

                console.log(`${name.toUpperCase()}: ${score} ` + (active ? '' : '*'));
            }));
        })
        .catch((err) => {
            console.log(err)
        });
});

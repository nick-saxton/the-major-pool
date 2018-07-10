const db = require('../config/db');
const Golfer = require('../models/golfer');
const Entrant = require('../models/entrant');

const entries = require('../config/entries');

// Holds all of the picked golfers per tournament along with their object IDs
let selections = {
    Masters: {},
    USOpen: {},
    OpenChampionship: {},
    PGAChampionship: {}
};

// Holds the DB objects to create for golfers and entrants
let golfersToCreate = [];
let entrantsToCreate = [];

// Iterate through the picks and create the entrant and golfer
// objects
for (entryName in entries) {
    const entry = entries[entryName];

    let entrant = new Entrant({
      name: entryName
    });

    for (tournamentName in entry) {
        const tournamentSelections = entry[tournamentName];

        tournamentSelections.forEach((selection) => {
            if (!selections[tournamentName].hasOwnProperty(selection)) {
                let golfer = new Golfer({
                  name: selection,
                  tournament: tournamentName,
                  score: 0,
                  active: true
                });

                golfersToCreate.push(golfer);

                const golferID = golfer._id;

                selections[tournamentName][selection] = golferID;

                entrant[tournamentName].push(golferID);
            } else {
              const golferID = selections[tournamentName][selection];
              entrant[tournamentName].push(golferID);
            }
        });
    }

    entrantsToCreate.push(entrant);
}

// Check the DB to see if golfers and entrants have been created,
// create them if they haven't been already
db(() => {
  // Check if golfers already exist in the DB and create
  // them if they don't
  Golfer.count({}, (err, count) => {
    if (err) {
      console.log(err);
    } else {
      if (count) {
        console.log('Golfers already initialized...');
      } else {
        Golfer.insertMany(golfersToCreate)
        .then((golfers) => {
          console.log(golfers);
        })
        .catch((err) => {
          console.log(err);
        });
      }
    }
  });

  // Check if the entries already exist in the DB and 
  // create them if they don't
  Entrant.count({}, (err, count) => {
    if (err) {
      console.log(err);
    } else {
      if (count) {
        console.log('Entries already initialized...');
      } else {
        Entrant.insertMany(entrantsToCreate)
          .then((entrants) => {
            console.log(entrants);
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }
  });
});

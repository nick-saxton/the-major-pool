import React, { Component } from 'react';
import Leaderboard from '../components/Leaderboard'

import { getEntryTotal } from '../utils/scoreHelpers';


class Overall extends Component {
  state = {
    entries: []
  }

  currPos = 1;

  getTotal(entry) {
    const tournaments = ['Masters', 'USOpen', 'OpenChampionship', 'PGAChampionship'];

    let total = 0;

    tournaments.forEach((tournament) => {
      total += entry[tournament].reduce((acc, current) => {
        return acc + current.score;
      }, 0);
    });

    return total;
  }

  componentDidMount() {
    fetch('/entries')
      .then(response => {
        return response.json()
      })
      .then(entries => {
        this.setState({
          entries: entries.sort((a, b) => {
            let diff = this.getTotal(a) - this.getTotal(b);
            if (diff === 0) {
              diff = (a.name < b.name) ? -1 : 1;
            }
            return diff;
          })
        })
      })
  }

  render() {
    return (
      <div>
        <h1 className="mb-5">{this.props.name}</h1>
      </div>
    )
  }
}

export default Overall;

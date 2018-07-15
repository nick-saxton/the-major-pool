import React, { Component } from 'react';
import { Table } from 'reactstrap';
import LeaderboardRow from './LeaderboardRow';

import { getEntryTotal } from '../utils/scoreHelpers';

class Leaderboard extends Component {
  determinePosition(entry, idx, entries) {
    let posStr = '';

    if (idx + 1 == entries.length) {
      if (getEntryTotal(entry, this.props.tournament) == getEntryTotal(entries[idx - 1], this.props.tournament)) {
        posStr = 'T' + this.currPos;
      } else {
        posStr = idx + 1;
      }
    } else {
      if (getEntryTotal(entry, this.props.tournament) == getEntryTotal(entries[idx + 1], this.props.tournament)) {
        posStr = 'T' + this.currPos;
      } else {
        posStr = idx + 1;
        this.currPos = idx + 2;
      }
    }

    return posStr;
  }

  formatScore(score) {
    if (score > 0) {
      score = '+' + score;
    } else if (score == 0) {
      score = 'E';
    }

    return score;
  }

  render() {
    return (
      <Table striped hover>
        <thead>
          <tr>
            <th className="pl-3">Position</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.entries.map((entry, idx, entries) => {
              return (
                <LeaderboardRow
                  key={idx}
                  position={this.determinePosition(entry, idx, entries)}
                  name={entry.name}
                  score={this.formatScore(getEntryTotal(entry, this.props.tournament))}
                />
              )
            })
          }
        </tbody>
      </Table>
    )
  }
}

export default Leaderboard;

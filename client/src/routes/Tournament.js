import React, { Component } from 'react';
import Leaderboard from '../components/Leaderboard'

import { getEntryTotal } from '../utils/scoreHelpers';


class Tournament extends Component {
  state = {
    entries: []
  }

  currPos = 1;

  componentDidMount() {
    fetch('/entries')
      .then(response => {
        return response.json()
      })
      .then(entries => {
        this.setState({
          entries: entries.sort((a, b) => {
            let diff = getEntryTotal(a, this.props.match.path.substring(1)) - getEntryTotal(b, this.props.match.path.substring(1));
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
        <Leaderboard entries={this.state.entries} tournament={this.props.match.path.substring(1)} />
      </div>
    )
  }
}

export default Tournament;

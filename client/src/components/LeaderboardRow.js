import React from 'react';

export default (props) => (
  <tr className="clickable">
    <td className="pl-5">{props.position}</td>
    <td>{props.name}</td>
    <td>{props.score}</td>
  </tr>
)

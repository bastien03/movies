import React from 'react';

import {
  ResponsiveContainer, BarChart, Bar, XAxis,
  YAxis, Tooltip, Legend,
} from 'recharts';

class DirectorsStats extends React.Component {
  render() {
    const { stats } = this.props;
    if (!stats || stats.length === 0) {
      return null;
    }
    const data = [];
    stats.map(director => data.push(
      {
        name: director._id,
        count: director.count,
      }),
    );
    data.sort((a, b) => b.count - a.count);

    return (
      <ResponsiveContainer height="50%">
        <BarChart layout="vertical" data={data}>
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" hide />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#990000" layout="vertical" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

DirectorsStats.propTypes = {
  stats: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      count: React.PropTypes.number.isRequired,
    }),
  ),
};

DirectorsStats.defaultProps = {
  stats: [],
};

export default DirectorsStats;

import React from 'react';

import { Treemap, ResponsiveContainer } from 'recharts';
import Please from 'pleasejs';

const getColors = length => Please.make_color({
  colors_returned: length,
  base_color: 'red',
});

const CustomizedContent = (props) => {
  const { depth, x, y, width, height, index, colors, name } = props;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: depth < 2 ? colors[index] : 'none',
          stroke: '#fff',
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      {
        depth === 1 ?
          <text
            x={x + (width / 2)}
            y={y + (height / 2) + 7}
            textAnchor="middle"
            fill="#fff"
            fontSize={14}
          >
            {name}
          </text>
        : null
      }
    </g>
  );
};

CustomizedContent.propTypes = {
  depth: React.PropTypes.number,
  x: React.PropTypes.number,
  y: React.PropTypes.number,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  index: React.PropTypes.number,
  colors: React.PropTypes.arrayOf(React.PropTypes.string),
  name: React.PropTypes.string,
};

CustomizedContent.defaultProps = {
  depth: undefined,
  x: undefined,
  y: undefined,
  width: undefined,
  height: undefined,
  index: undefined,
  colors: undefined,
  name: undefined,
};

class CountriesStats extends React.Component {
  render() {
    const { stats } = this.props;
    if (!stats || stats.length === 0) {
      return null;
    }
    const data = [];
    stats.map(country => data.push(
      {
        name: `${country._id} (${country.count})`,
        children: [
          { name: country._id, size: country.count },
        ],
      }),
    );
    const colors = getColors(data.length);
    return (
      <ResponsiveContainer height="50%">
        <Treemap
          data={data}
          dataKey="size"
          stroke="#fff"
          content={<CustomizedContent colors={colors} />}
        />
      </ResponsiveContainer>
    );
  }
}

CountriesStats.propTypes = {
  stats: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      count: React.PropTypes.number.isRequired,
    }),
  ),
};

CountriesStats.defaultProps = {
  stats: [],
};

export default CountriesStats;

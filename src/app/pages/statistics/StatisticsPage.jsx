import React from 'react';
import { Treemap, BarChart } from 'react-d3';

class StatisticsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stats: {
        groupByCountry: [],
        groupByDecade: [],
      },
    };
  }

  componentDidMount() {
    this.loadStats();
  }

  loadStats() {
    this.props.loadStatistics()
      .then((stats) => {
        this.setState({
          stats,
        });
      });
  }

  render() {
    // const language = this.props.lang;
    const stats = this.state.stats;

    const treemapData = [];
    stats.groupByCountry.map(country => treemapData.push(
      { label: `${country._id} (${country.count})`, value: country.count }),
    );

    const barData = [
      {
        name: 'Series A',
        values: [],
      }
    ];
    stats.groupByDecade.map(decade => barData[0].values.push(
      { x: decade._id, y: decade.count },
    ));

    return (
      <div className="statisticsPage">
        <h1>Statistics</h1>
        <h4>Country</h4>
        <Treemap
          data={treemapData}
          width={800}
          height={250}
          textColor="#484848"
          fontSize="12px"
          hoverAnimation
        />
        <h4>Year</h4>
        <div className="yearChart">
          <BarChart
            data={barData}
            width={800}
            height={200}
            fill={'#3182bd'}
            yAxisLabel="Label"
            xAxisLabel="Value"
          />
        </div>
      </div>
    );
  }
}

StatisticsPage.propTypes = {
  loadStatistics: React.PropTypes.func.isRequired,
  // lang: React.PropTypes.string.isRequired,
};

export default StatisticsPage;

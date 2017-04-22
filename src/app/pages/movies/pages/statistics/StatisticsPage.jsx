import React from 'react';

import CountriesStats from './components/CountriesStats';
import DirectorsStats from './components/DirectorsStats';

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
    return (
      <div className="statisticsPage">
        <h1>Statistics</h1>
        <h4>Countries</h4>
        <CountriesStats stats={stats.groupByCountry} />
        <h4>Directors</h4>
        <DirectorsStats stats={stats.groupByDirector} />
      </div>
    );
  }
}

StatisticsPage.propTypes = {
  loadStatistics: React.PropTypes.func.isRequired,
  // lang: React.PropTypes.string.isRequired,
};

export default StatisticsPage;

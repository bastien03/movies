import React from 'react';

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

    const countryStats = stats.groupByCountry.map(country =>
      (<div key={country._id}>{`${country._id}: ${country.count}`}</div>)
    );
    const decadeStats = stats.groupByDecade.map(decade =>
      (<div key={decade._id}>{`${decade._id}: ${decade.count}`}</div>)
    );
    return (
      <div className="adminPage">
        <h3>Statistics</h3>
        <h4>Country</h4>
        {countryStats}
        <h4>Year</h4>
        {decadeStats}
      </div>
    );
  }
}

StatisticsPage.propTypes = {
  loadStatistics: React.PropTypes.func.isRequired,
  // lang: React.PropTypes.string.isRequired,
};

export default StatisticsPage;

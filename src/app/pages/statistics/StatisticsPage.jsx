import React from 'react';
import { Treemap } from 'react-d3';
import Measure from 'react-measure';

class StatisticsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dimensions: {},
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

  updateDimensions(dimensions) {
    this.setState({
      dimensions,
      updated: true,
    });
  }

  renderPage(width) {
    if (!width) {
      return <div />;
    }

    const chartWidth = width * 0.9;
    const stats = this.state.stats;
    const treemapData = [];
    stats.groupByCountry.map(country => treemapData.push(
      { label: `${country._id} (${country.count})`, value: country.count }),
    );

    return (
      <div className="statisticsPage">
        <h1>Statistics</h1>
        <h4>Country</h4>
        <Treemap
          data={treemapData}
          width={chartWidth}
          height={250}
          textColor="#484848"
          fontSize="12px"
          hoverAnimation
        />
      </div>
    );
  }

  render() {
    // const language = this.props.lang;
    const { width } = this.state.dimensions;

    return (
      <Measure
        onMeasure={(dimensions) => {
          if (this.state.dimensions.width !== dimensions.width) {
            this.updateDimensions(dimensions);
          }
        }}
      >
        {this.renderPage(width)}
      </Measure>
    );
  }
}

StatisticsPage.propTypes = {
  loadStatistics: React.PropTypes.func.isRequired,
  // lang: React.PropTypes.string.isRequired,
};

export default StatisticsPage;

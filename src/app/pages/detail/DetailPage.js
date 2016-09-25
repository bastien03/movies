import React from 'react';

class DetailPage extends React.Component {

  render() {
    if (!this.props.movie) {
      return (<div>Loading</div>);
    }
    const id = this.props.params.id;
    let { title, year, url, director } = this.props.movie;

    return (
      <div className="container page">
        <h3>{`Edit '${title}'`}</h3>
      </div>
    );
  }
  }

DetailPage.propTypes = {
  movie: React.PropTypes.shape({
    id: React.PropTypes.string,
    title: React.PropTypes.string,
    year: React.PropTypes.string,
    url: React.PropTypes.string,
    director: React.PropTypes.string,
  }),
  params: React.PropTypes.object,
  loadMovie: React.PropTypes.func.isRequired,
};

export default DetailPage;

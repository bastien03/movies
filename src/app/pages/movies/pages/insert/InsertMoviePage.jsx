import React from 'react';

import EditMovieComponent from '../../components/movies/EditMovieComponent';

class InsertMoviePage extends React.Component {

  saveMovie(movie) {
    this.props.onSaveClick(
      {
        de: movie.title.de,
        en: movie.title.en,
        fr: movie.title.fr,
      },
      movie.year,
      movie.url,
      movie.director,
      movie.country,
      movie.awards,
      this.props.router,
    );
  }

  render() {
    return (
      <EditMovieComponent
        saveMovie={(...args) => this.saveMovie(...args)}
        lang={this.props.lang}
      />
    );
  }

}

InsertMoviePage.propTypes = {
  onSaveClick: React.PropTypes.func,
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }),
  lang: React.PropTypes.string,
};

export default InsertMoviePage;

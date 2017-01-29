import React from 'react';

import EditMovieComponent from '../../components/movies/EditMovieComponent';

class InsertMoviePage extends React.Component {

  constructor(props) {
    super(props);
    /*this.state = {
      movie: {},
    };*/
  }

  saveMovie(movie) {
    console.log('save movie', movie);
    // this.props.saveMovie(movie.id, movie, this.props.router);
    /*this.props.onSaveClick(
      {
        de: movie.title.de.value,
        en: movie.title.en.value,
        fr: movie.title.fr.value,
        default: movie.title.default.value,
      },
      movie.year.value,
      movie.url.value,
      movie.director.value,
      movie.country.value,
      movie.awards,
      this.props.router,
    );*/
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

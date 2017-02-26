import React from 'react';

import EditMovieComponent from '../../components/movies/EditMovieComponent';

class EditMoviePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movie: {
        url: '',
        director: '',
        country: '',
        year: 1970,
      },
    };
  }

  componentDidMount() {
    this.props.loadMovie(this.props.params.id).then((movie) => {
      this.setState({
        movie,
      });
    });
  }

  saveMovie(movie) {
    this.props.saveMovie(movie.id, movie, this.props.router);
  }

  render() {
    return (
      <EditMovieComponent
        movie={this.state.movie}
        saveMovie={(...args) => this.saveMovie(...args)}
        lang={this.props.lang}
      />
    );
  }
}

EditMoviePage.propTypes = {
  params: React.PropTypes.shape({
    id: React.PropTypes.string,
  }),
  loadMovie: React.PropTypes.func.isRequired,
  saveMovie: React.PropTypes.func.isRequired,
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }),
  lang: React.PropTypes.string,
};

export default EditMoviePage;

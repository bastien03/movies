import React from 'react';
import { getTitle } from '../../components/movies/MovieTitle';

class EditMoviePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      initialTitle: {},
    };
  }

  componentDidMount() {
    this.props.loadMovie(this.props.params.id).then((movie) => {
      this.setState({
        movie,
        initialTitle: movie.title,
      });
    });
  }

  saveMovie(e, id) {
    e.preventDefault();
    this.props.saveMovie(id, this.state.movie, this.props.router);
  }

  handleTitleChange(key, value) {
    const newState = Object.assign({}, this.state.movie, {
      title: Object.assign({}, this.state.movie.title, {
        [key]: value,
      }),
    });
    this.setState({ movie: newState });
  }

  handleChange(key, value) {
    const newState = Object.assign({}, this.state.movie, {
      [key]: value,
    });
    this.setState({ movie: newState });
  }

  render() {
    const language = this.props.lang;
    const movie = this.state.movie;
    if (!movie || !movie.title) {
      return (<div>Loading</div>);
    }
    const id = this.props.params.id;
    const { title, year, url, director, country } = movie;

    return (
      <div className="editPage">
        <h1>{`Edit '${getTitle(this.state.initialTitle, language)}'`}</h1>
        <form
          name="add-movie"
          onSubmit={(e) => { this.saveMovie(e, id); }}
        >
          <fieldset>
            <legend>{'Title'}</legend>
            <div className="formGroup">
              <span className="col-xs-12 col-sm-12 control-label">Title (de)</span>
              <input
                type="text"
                onChange={e => this.handleTitleChange('de', e.target.value)}
                defaultValue={title.de}
              />
            </div>
            <div className="formGroup">
              <span className="col-xs-12 col-sm-12 control-label">Title (en)</span>
              <input
                type="text"
                onChange={e => this.handleTitleChange('en', e.target.value)}
                defaultValue={title.en}
              />
            </div>
            <div className="formGroup">
              <span className="col-xs-12 col-sm-12 control-label">Title (fr)</span>
              <input
                type="text"
                onChange={e => this.handleTitleChange('fr', e.target.value)}
                defaultValue={title.fr}
              />
            </div>
          </fieldset>
          <div className="formGroup">
            <span className="col-xs-12 col-sm-12 control-label">Year</span>
            <input
              type="text"
              onChange={e => this.handleChange('year', e.target.value)}
              defaultValue={year}
            />
          </div>
          <div className="formGroup">
            <span className="col-xs-12 col-sm-12 control-label">Url</span>
            <input
              type="text"
              onChange={e => this.handleChange('url', e.target.value)}
              defaultValue={url}
            />
          </div>
          <div className="formGroup">
            <span className="col-xs-12 col-sm-12 control-label">Director</span>
            <input
              type="text"
              onChange={e => this.handleChange('director', e.target.value)}
              defaultValue={director}
            />
          </div>
          <div className="formGroup">
            <span className="col-xs-12 col-sm-12 control-label">Country</span>
            <input
              type="text"
              onChange={e => this.handleChange('country', e.target.value)}
              defaultValue={country}
            />
          </div>
          <div className="formGroup">
            <div className="">
              <input type="submit" value="save" className="btn btn-default" />
            </div>
          </div>
        </form>
      </div>
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

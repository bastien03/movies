import React from 'react';

import { getTitle } from '../../components/movies/MovieTitle';
import SelectAwards from '../../components/movies/awards/SelectAwardsComponent';

const emptyMovie = {
  title: {
    de: '',
    en: '',
    fr: '',
  },
  url: '',
  director: '',
  country: '',
  year: 1970,
  awards: [],
};

class EditMovieComponent extends React.Component {

  constructor(props) {
    super(props);
    const movie = props.movie ? props.movie : emptyMovie;
    const initialTitle = props.movie ? props.movie.title : {};
    this.state = {
      movie,
      initialTitle,
    };
  }

  componentWillReceiveProps(props) {
    const movie = props.movie ? props.movie : emptyMovie;
    const initialTitle = props.movie ? props.movie.title : {};
    this.setState({
      movie,
      initialTitle,
    });
  }

  saveMovie(e) {
    e.preventDefault();
    this.props.saveMovie(this.state.movie);
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

  handleChangeNumber(key, value) {
    const number = parseInt(value, 10);
    this.handleChange(key, isNaN(number) ? 1970 : number);
  }

  handleAwardsChange(award, checked) {
    const awards = new Set(this.state.movie.awards);
    if (checked) {
      awards.forEach((a) => { if (a.name === award.name) awards.delete(a); });
      awards.add(award);
    } else {
      awards.forEach((a) => { if (a.name === award.name) awards.delete(a); });
    }
    const newState = Object.assign({}, this.state.movie, {
      awards: Array.from(awards),
    });
    this.setState({ movie: newState });
  }

  render() {
    const language = this.props.lang;
    const movie = this.state.movie;
    const { id, title, year, url, director, country, awards } = movie ? movie : {};
    const selectedTitle = movie && movie.title ? getTitle(movie.title, language) : '';
    const titleDe = title ? title.de : '';
    const titleFr = title ? title.fr : '';
    const titleEn = title ? title.en : '';
    return (
      <div className="editPage">
        <h1>{`Edit '${selectedTitle}'`}</h1>
        <form
          name="add-movie"
          onSubmit={(e) => { this.saveMovie(e, id); }}
        >
          <fieldset>
            <legend>{'Title'}</legend>
            <div className="formGroup title-de">
              <span className="col-xs-12 col-sm-12 control-label">Title (de)</span>
              <input
                type="text"
                onChange={e => this.handleTitleChange('de', e.target.value)}
                value={titleDe}
              />
            </div>
            <div className="formGroup title-en">
              <span className="col-xs-12 col-sm-12 control-label">Title (en)</span>
              <input
                type="text"
                onChange={e => this.handleTitleChange('en', e.target.value)}
                value={titleEn}
              />
            </div>
            <div className="formGroup title-fr">
              <span className="col-xs-12 col-sm-12 control-label">Title (fr)</span>
              <input
                type="text"
                onChange={e => this.handleTitleChange('fr', e.target.value)}
                value={titleFr}
              />
            </div>
          </fieldset>
          <div className="formGroup year">
            <span className="col-xs-12 col-sm-12 control-label">Year</span>
            <input
              type="text"
              onChange={e => this.handleChangeNumber('year', e.target.value)}
              value={year}
            />
          </div>
          <div className="formGroup url">
            <span className="col-xs-12 col-sm-12 control-label">Url</span>
            <input
              type="text"
              onChange={e => this.handleChange('url', e.target.value)}
              value={url}
            />
          </div>
          <div className="formGroup director">
            <span className="col-xs-12 col-sm-12 control-label">Director</span>
            <input
              type="text"
              onChange={e => this.handleChange('director', e.target.value)}
              value={director}
            />
          </div>
          <div className="formGroup country">
            <span className="col-xs-12 col-sm-12 control-label">Country</span>
            <input
              type="text"
              onChange={e => this.handleChange('country', e.target.value)}
              value={country}
            />
          </div>
          <div className="formGroup">
            <span className="col-xs-12 col-sm-12 control-label">Awards</span>
            <SelectAwards
              movieAwards={awards}
              movieYear={movie.year}
              onChange={(...args) => this.handleAwardsChange(...args)}
            />
          </div>
          <div className="formGroup">
            <div className="saveButton">
              <input type="submit" value="save" className="btn btn-default" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

EditMovieComponent.propTypes = {
  movie: React.PropTypes.shape({
    id: React.PropTypes.string,
    title: React.PropTypes.shape({
      de: React.PropTypes.string,
      en: React.PropTypes.string,
      fr: React.PropTypes.string,
    }),
  }),
  saveMovie: React.PropTypes.func.isRequired,
  lang: React.PropTypes.string,
};

export default EditMovieComponent;

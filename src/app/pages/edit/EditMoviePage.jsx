import React from 'react';
import { getTitle } from '../../components/movies/MovieTitle';

class EditMoviePage extends React.Component {

  componentDidMount() {
    this.props.loadMovie(this.props.params.id);
  }

  saveMovie(e, id, movie) {
    e.preventDefault();
    this.props.saveMovie(id, movie, this.props.router);
  }

  render() {
    const language = 'fr';
    if (!this.props.movie) {
      return (<div>Loading</div>);
    }
    const id = this.props.params.id;
    let { title, year, url, director } = this.props.movie;

    return (
      <div className="container page edit">
        <h3>{`Edit '${getTitle(title, language)}'`}</h3>
        <form
          name="add-movie"
          onSubmit={
          (e) => {
            this.saveMovie(e, id,
              {
                title: {
                  de: title.de.value,
                  en: title.en.value,
                  fr: title.fr.value,
                  default: title.default.value,
                },
                year: year.value,
                url: url.value,
                director: director.value,
              });
          }}
        >
          <fieldset>
            <div className="formGroup">
              <span className="col-sm-2 control-label">Title (de)</span>
              <input type="text" ref={(node) => { title.de = node; }} defaultValue={title.de} />
              <span className="col-sm-2 control-label">Title (en)</span>
              <input type="text" ref={(node) => { title.en = node; }} defaultValue={title.en} />
              <span className="col-sm-2 control-label">Title (fr)</span>
              <input type="text" ref={(node) => { title.fr = node; }} defaultValue={title.fr} />
              <span className="col-sm-2 control-label">Title (default)</span>
              <input
                type="text" ref={(node) => { title.default = node; }}
                defaultValue={title.default}
              />
            </div>
          </fieldset>
          <div className="formGroup">
            <span className="col-sm-2 control-label">Year</span>
            <input type="text" ref={(node) => { year = node; }} defaultValue={year} />
          </div>
          <div className="formGroup">
            <span className="col-sm-2 control-label">Url</span>
            <input type="text" ref={(node) => { url = node; }} defaultValue={url} />
          </div>
          <div className="formGroup">
            <span className="col-sm-2 control-label">Director</span>
            <input type="text" ref={(node) => { director = node; }} defaultValue={director} />
          </div>
          <div className="formGroup">
            <div className="col-sm-offset-2 col-sm-10">
              <input type="submit" value="save" className="btn btn-default" />
            </div>
          </div>
        </form>
      </div>
    );
  }
  }

EditMoviePage.propTypes = {
  movie: React.PropTypes.shape({
    id: React.PropTypes.string,
    title: React.PropTypes.shape({
      de: React.PropTypes.string,
      fr: React.PropTypes.string,
      en: React.PropTypes.string,
      default: React.PropTypes.string,
    }),
    year: React.PropTypes.number,
    url: React.PropTypes.string,
    director: React.PropTypes.string,
  }),
  params: React.PropTypes.shape({
    id: React.PropTypes.string,
  }),
  loadMovie: React.PropTypes.func.isRequired,
  saveMovie: React.PropTypes.func.isRequired,
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }),
};

export default EditMoviePage;

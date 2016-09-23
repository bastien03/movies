import React from 'react';

class EditMoviePage extends React.Component {

  componentDidMount() {
    this.props.loadMovie(this.props.params.id);
  }

  saveMovie(e, id, movie) {
    e.preventDefault();
    this.props.saveMovie(id, movie, this.props.router);
  }

  render() {
    if (!this.props.movie) {
      return (<div>Loading</div>);
    }
    const id = this.props.params.id;
    let { title, year, url, director } = this.props.movie;

    return (
      <div className="container page edit">
        <h3>{`Edit '${title}'`}</h3>
        <form
          name="add-movie"
          onSubmit={
          e => {
            this.saveMovie(e, id, { title: title.value, year: year.value,
              url: url.value, director: director.value });
          }}
        >
          <div className="formGroup">
            <span className="col-sm-2 control-label">Title</span>
            <input type="text" ref={node => { title = node; }} defaultValue={title} />
          </div>
          <div className="formGroup">
            <span className="col-sm-2 control-label">Year</span>
            <input type="text" ref={node => { year = node; }} defaultValue={year} />
          </div>
          <div className="formGroup">
            <span className="col-sm-2 control-label">Url</span>
            <input type="text" ref={node => { url = node; }} defaultValue={url} />
          </div>
          <div className="formGroup">
            <span className="col-sm-2 control-label">Director</span>
            <input type="text" ref={node => { director = node; }} defaultValue={director} />
          </div>
          <div className="formGroup">
            <div className="col-sm-offset-2 col-sm-10">
              <input type="submit" value="edit" className="btn btn-default" />
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
    title: React.PropTypes.string,
    year: React.PropTypes.string,
    url: React.PropTypes.string,
    director: React.PropTypes.string,
  }),
  params: React.PropTypes.object,
  loadMovie: React.PropTypes.func.isRequired,
  saveMovie: React.PropTypes.func.isRequired,
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }),
};

export default EditMoviePage;

import React from 'react';

class EditMoviePresentationalComponent extends React.Component {

  constructor(props) {
    super(props);

    const movie = this.props.movie;
    const params = this.props.params;

    if (movie) {
      this.state = {
        title: movie.title,
        id: params.id,
      };
    } else {
      this.state = {
        title: '',
        id: params.id,
      };
    }
    this.handleDirectorChange = this.handleDirectorChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  componentDidMount() {
    this.props.loadMovie(this.state.id);
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleYearChange(event) {
    this.setState({ year: event.target.value });
  }

  handleUrlChange(event) {
    this.setState({ url: event.target.value });
  }

  handleDirectorChange(event) {
    this.setState({ director: event.target.value });
  }

  render() {
    if (!this.props.movie) {
      return (<div>Loading</div>);
    }
    const { id } = this.props.movie;
    let { title, year, url, director } = this.props.movie;
    return (
      <div className="container">
        <h1>Edit Movie</h1>
        <form name="add-movie" method="post" action={`editmovies/${id}`}>
          <div className="form-group">
            <span className="col-sm-2 control-label">Title</span>
            <input type="text" name="title" value={title} onChange={this.handleTitleChange} />
          </div>
          <div className="form-group">
            <span className="col-sm-2 control-label">Year</span>
            <input type="text" name="year" value={year} onChange={this.handleYearChange} />
          </div>
          <div className="form-group">
            <span className="col-sm-2 control-label">Url</span>
            <input type="text" name="url" value={url} onChange={this.handleUrlChange} />
          </div>
          <div className="form-group">
            <span className="col-sm-2 control-label">Director</span>
            <input
              type="text"
              name="director"
              value={director}
              onChange={this.handleDirectorChange}
            />
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <input type="submit" name="edit" className="btn btn-default" value="save" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

EditMoviePresentationalComponent.propTypes = {
  movie: React.PropTypes.shape({
    id: React.PropTypes.string,
    title: React.PropTypes.string,
    year: React.PropTypes.string,
    url: React.PropTypes.string,
    director: React.PropTypes.string,
  }),
  params: React.PropTypes.object,
};

export default EditMoviePresentationalComponent;

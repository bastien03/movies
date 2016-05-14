import React, {PropTypes} from 'react'

class EditMoviePresentationalComponent extends React.Component {

    constructor(props) {
        super(props)
        console.log('constructor presentational')
        if (this.props.movie) {
            this.state = {
                title: this.props.movie.title,
                id: this.props.params.id
            }
        } else {
            this.state = {
                title: '',
                id: this.props.params.id
            }
        }
        this.handleDirectorChange = this.handleDirectorChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleUrlChange = this.handleUrlChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    handleTitleChange(event) {
        this.setState({title: event.target.value});
    }

    handleYearChange(event) {
        this.setState({year: event.target.value});
    }

    handleUrlChange(event) {
        this.setState({url: event.target.value});
    }

    handleDirectorChange(event) {
        this.setState({director: event.target.value});
    }

    componentDidMount() {
        console.log('component did mount');
        this.props.loadMovie(this.state.id);
    }

    render() {
        // let movie = this.props.movie ? this.props.movie : {};
        console.log('render presentational', this.props)
        if (!this.props.movie) {
            return (<div>Loading</div>)
        } else {
            let {id, title, year, url, director} = this.props.movie;
            console.log('render', title, year, url, director);
            return (
                <div className="container">
                    <h1>Edit Movie</h1>
                    <form name="add-movie" method="post" action={"editmovies/" + id}>
                        <div className="form-group">
                            <span className="col-sm-2 control-label">Title</span>
                            <input type="text" name="title" value={title} onChange={this.handleTitleChange}/>
                        </div>
                        <div className="form-group">
                            <span className="col-sm-2 control-label">Year</span>
                            <input type="text" name="year" value={year} onChange={this.handleYearChange}/>
                        </div>
                        <div className="form-group">
                            <span className="col-sm-2 control-label">Url</span>
                            <input type="text" name="url" value={url} onChange={this.handleUrlChange}/>
                        </div>
                        <div className="form-group">
                            <span className="col-sm-2 control-label">Director</span>
                            <input type="text" name="director" value={director} onChange={this.handleDirectorChange}/>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <input type="submit" name="edit" className="btn btn-default" value="save"/>
                            </div>
                        </div>
                    </form>
                </div>
            )
        }
    }
}

EditMoviePresentationalComponent.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.string,
    url: PropTypes.string,
    director: PropTypes.string
}

export default EditMoviePresentationalComponent

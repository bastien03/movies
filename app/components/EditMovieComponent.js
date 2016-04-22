import React from "react";
import {connect} from 'react-redux'
import request from 'superagent'
import {loadCurrentMovie, fetchCurrentMovie} from '../actions/index'
import EditMoviePresentationalComponent from './EditMoviePresentationalComponent'

class EditMovieComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log('constructor container')
        // if (this.props.movie) {
        //     this.state = {
        //         title: this.props.movie.title
        //     }
        // } else {
        //     this.state = {
        //         title: ''
        //     }
        // }
        // this.handleDirectorChange = this.handleDirectorChange.bind(this);
        // this.handleYearChange = this.handleYearChange.bind(this);
        // this.handleUrlChange = this.handleUrlChange.bind(this);
        // this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    // componentDidMount() {
    //     console.log('componentDidMount container')
    //     let onLoaded = this.props.onLoaded,
    //         movieId = this.props.params.id,
    //         setState = this.setState;
    //     request
    //         .get('/movies/' + movieId)
    //         .set('Accept', 'application/json')
    //         .end(function (err, res) {
    //             let currentMovie = JSON.parse(res.text);
    //             // setState({title: currentMovie.title});
    //             onLoaded(currentMovie);
    //         });
    // }

    // handleTitleChange(event) {
    //     this.setState({title: event.target.value});
    // }
    //
    // handleYearChange(event) {
    //     this.setState({year: event.target.value});
    // }
    //
    // handleUrlChange(event) {
    //     this.setState({url: event.target.value});
    // }
    //
    // handleDirectorChange(event) {
    //     this.setState({director: event.target.value});
    // }

    // render() {
    //     // let movie = this.props.movie ? this.props.movie : {};
    //     let {id, title, year, url, director} = this.state;
    //     console.log('render', title, year, url, director);
    //     return (
    //         <div className="container">
    //             <h1>Edit Movie</h1>
    //             <form name="add-movie" method="post" action={"editmovies/" + id}>
    //                 <div className="form-group">
    //                     <span className="col-sm-2 control-label">Title</span>
    //                     <input type="text" name="title" value={title} onChange={this.handleTitleChange}/>
    //                 </div>
    //                 <div className="form-group">
    //                     <span className="col-sm-2 control-label">Year</span>
    //                     <input type="text" name="year" value={year} onChange={this.handleYearChange}/>
    //                 </div>
    //                 <div className="form-group">
    //                     <span className="col-sm-2 control-label">Url</span>
    //                     <input type="text" name="url" value={url} onChange={this.handleUrlChange}/>
    //                 </div>
    //                 <div className="form-group">
    //                     <span className="col-sm-2 control-label">Director</span>
    //                     <input type="text" name="director" value={director} onChange={this.handleDirectorChange}/>
    //                 </div>
    //                 <div className="form-group">
    //                     <div className="col-sm-offset-2 col-sm-10">
    //                         <input type="submit" name="edit" className="btn btn-default" value="save"/>
    //                     </div>
    //                 </div>
    //             </form>
    //         </div>
    //     )
    // }
}

const mapStateToProps = (state) => {
    console.log('map state to props')
    return state
}

const mapDispatchToProps = (dispatch) => {
    console.log('map dispatch to props')
    // let movieId = this.props.params.id;
    return {
        loadMovie: (movieId) => {
         dispatch(fetchCurrentMovie(movieId))
        }
        // loadMovie: (movieId) => {
        //     // dispatch(loadCurrentMovie(currentMovie))
        //     // let onLoaded = this.props.onLoaded,
        //     //     let movieId = this.props.params.id,
        //     //     setState = this.setState;
        //     request
        //         .get('/movies/' + movieId)
        //         .set('Accept', 'application/json')
        //         .end(function (err, res) {
        //             let currentMovie = JSON.parse(res.text);
        //             // setState({title: currentMovie.title});
        //             // onLoaded(currentMovie);
        //             dispatch(loadCurrentMovie(currentMovie))
        //             console.log('onLoaded', currentMovie);
        //         });
        // }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditMoviePresentationalComponent)
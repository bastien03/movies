import React from 'react'
import {linkTo} from '../../../link'
import {getMovie} from '../../../services/MoviesService.js'

export default class EditMovieComponent extends React.Component {

    static loadData(route, params, request, cb) {
        let movieId = params.id;
        getMovie(movieId, function (movie) {
            var configuration = {
                movie: movie,
                url: {
                    edit: linkTo('editmovies/' + movieId)
                },
                baseUrl: '..',
                isAuthenticated: request.user,
                link: {
                    login: linkTo('login')
                }
            };

            cb(configuration);
        });
    }

    constructor(props) {
        super(props);
        this.state = {data: this.props.route.data};
    }

    render() {
        let movie = this.state.data.movie;
        return (
            <div className="container">
                <h1>Edit Movie</h1>
                <form name="add-movie" method="post" action={"/movies/editmovies/" + movie._id}>
                    <div className="form-group">
                        <span className="col-sm-2 control-label">Title</span>
                        <input type="text" name="title" value={movie.title}/>
                    </div>
                    <div className="form-group">
                        <span className="col-sm-2 control-label">Year</span>
                        <input type="text" name="year" value={movie.year}/>
                    </div>
                    <div className="form-group">
                        <span className="col-sm-2 control-label">Url</span>
                        <input type="text" name="url" value={movie.url}/>
                    </div>
                    <div className="form-group">
                        <span className="col-sm-2 control-label">Director</span>
                        <input type="text" name="director" value={movie.director}/>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <input type="submit" name="edit" className="btn btn-default"/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
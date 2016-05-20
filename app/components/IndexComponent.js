import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router'
import uris from '../uris';

class IndexComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillMount() {
    }

    render() {
        //console.log('IndexComponent render');
        let movies = this.props.movies,
            directors = this.props.directors,
            isUserLoggedIn = this.props.isAuthenticated,
            moviesComponents = movies.map((movie) => {
                let movieHeader;
                if (isUserLoggedIn) {
                    movieHeader = <div>
                        <button className="remove-btn"
                                onclick={"app.deleteMovie('" + movie._id + "', '" + movie.title + "')"}>X
                        </button>
                        <Link to={uris.editMoviePage(movie._id)}>edit</Link>
                    </div>
                }
                return (
                    <li key={movie._id}>
                        {movieHeader}
                        <h2>{movie.title}</h2>
                        <a href={"?director=" + movie.director} className="movieDirector">{movie.director}</a>
                        <div className="movieYear">{movie.year}</div>
                        <a href={movie.url} target="_blank" className="movieTrailer">⇝ trailer</a>
                    </li>
                )
            }),
            directorsComponents = directors.map((director) => {
                return (
                    <div key={director.name}>
                        {director.name}({director.numberMovies})
                    </div>
                )
            });

        let header;
        if (isUserLoggedIn) {
            header = <div>
                <a href={uris.logoutApi()} className="pageLink">logout</a>
                <Link to={uris.newMoviePage()} className="pageLink">add a movie</Link>
            </div>
        } else {
            header = <Link to={uris.loginPage()} className="pageLink">login</Link>
        }
        return (
            <div className="container">
                <h1>Movies</h1>

                {header}

                <div className="center">
                    {movies.length} movies
                </div>
                <div className="moviesDirector">
                    {directorsComponents}
                </div>
                <div className="moviesList">
                    <ul>
                        {moviesComponents}
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
};

export default connect(mapStateToProps)(IndexComponent)

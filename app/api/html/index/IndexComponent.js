import React from 'react'
import {linkTo} from '../../../link';
import {getMovies} from '../../../services/MoviesService.js';

export default class IndexComponent extends React.Component {

    static loadData(route, params, request, cb) {
        getMovies(route.path, function (movies) {
            var configuration = {
                movies: movies,
                directors: IndexComponent.getDirectors(movies),
                isAuthenticated: request.user,
                baseUrl: '.',
                link: {
                    home: linkTo(),
                    edit: linkTo('edit/'),
                    login: linkTo('login'),
                    logout: linkTo('logout'),
                    newMovie: linkTo('new-movie')
                }
            };
            cb(configuration);
        })
    }

    static getDirectors(movies) {
        var tmp_directors = [];
        var directors = [];
        for (var idx in movies) {
            var director = movies[idx].director;
            if (tmp_directors[director]) {
                tmp_directors[director] = tmp_directors[director] + 1;
            } else {
                tmp_directors[director] = 1;
            }
        }

        for (var name in tmp_directors) {
            if (name == 'undefined') continue;

            directors.push({
                name: name,
                numberMovies: parseInt(tmp_directors[name])
            });
        }

        return directors.sort(function (a, b) {
            return b.numberMovies - a.numberMovies
        });
    }

    constructor(props) {
        super(props);
        this.state = {data: this.props.route.data};
    }

    componentWillMount() {
        //getMovies(this.props.location, function (movies) {
        //    var configuration = {
        //        movies: movies,
        //        //directors: getDirectors(movies),
        //        //isAuthenticated: this.props.req.user,
        //        baseUrl: '.',
        //        link: {
        //            home: linkTo(),
        //            edit: linkTo('edit/'),
        //            login: linkTo('login'),
        //            logout: linkTo('logout'),
        //            newMovie: linkTo('new-movie')
        //        }
        //    };
        //    //var html = jade.renderFile(path.join(__dirname,'index.jade'), configuration);
        //    //return res.send(html);
        //    this.setState({data: configuration});
        //}.bind(this));
    }

    render() {
        let data = this.state.data,
            isUserLoggedIn = data.isAuthenticated,
            movies = data.movies.map((movie) => {
            let movieHeader;
            if(isUserLoggedIn) {
                movieHeader = <div>
                    <button className="remove-btn" onclick={"app.deleteMovie('" + movie._id + "', '" + movie.title + "')"}>X</button>
                    <a href={data.link.edit + movie._id}>edit</a>
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
            directors = data.directors.map((director) => {
            return (
                <div key={director.name}>
                    {director.name}({director.numberMovies})
                </div>
            )
        });

        let header;
        if (isUserLoggedIn) {
            header = <div>
                <a href={data.link.logout} className="pageLink">logout</a>
                <a href={data.link.newMovie} className="pageLink">add a movie</a>
            </div>
        } else {
            header = <a href={data.link.login} className="pageLink">login</a>
        }
        return (
            <html>
            <head>
                <link rel="stylesheet" href="/movies/styles.css"/>
                <link rel="stylesheet"
                      href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"
                      integrity="sha512-dTfge/zgoMYpP7QbHy4gWMEGsbsdZeCXz7irItjcC3sPUFtf0kuFbDz/ixG7ArTxmDjLXDmezHubeNikyKGVyQ=="
                      crossOrigin="anonymous"/>
                <script src="/movies/app.js"/>
            </head>
            <body>
            <div>
                <div className="container">
                    <h1>Movies</h1>

                    {header}

                    <div className="center">
                        {data.movies.length} movies
                    </div>
                    <div className="moviesDirector">
                        {directors}
                    </div>
                    <div className="moviesList">
                        <ul>
                            {movies}
                        </ul>
                    </div>
                </div>
            </div>
            </body>
            </html>
        )
    }
}
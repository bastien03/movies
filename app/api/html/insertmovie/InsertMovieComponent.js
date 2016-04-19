import React from 'react'

export default class InsertMovieComponent extends React.Component {
    render() {
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
                    <form name="add-movie" method="post" action="/movies/movies">
                        <div className="form-group">
                            <span className="col-sm-2 control-label">Title</span>
                            <input type="text" name="title"/>
                        </div>
                        <div className="form-group">
                            <span className="col-sm-2 control-label">Year</span>
                            <input type="text" name="year"/>
                        </div>
                        <div className="form-group">
                            <span className="col-sm-2 control-label">Url</span>
                            <input type="text" name="url"/>
                        </div>
                        <div className="form-group">
                            <span className="col-sm-2 control-label">Director</span>
                            <input type="text" name="director"/>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <input type="submit" name="add" className="btn btn-default"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            </body>
            </html>
        )
    }
}
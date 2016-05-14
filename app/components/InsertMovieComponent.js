import React from 'react'

export default class InsertMovieComponent extends React.Component {
    render() {
        return (
            <div className="container">
                <h1>Movies</h1>
                <form name="add-movie" method="post" action="movies">
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
        )
    }
}
import React from 'react'
import uris from '../uris'

export default class InsertMovieComponent extends React.Component {

    // handleClick: function(event) {
    //   this.setState({liked: !this.state.liked});
    // },

    render() {
        let title, year, url, director;
        return (
            <div className="container">
                <h1>Movies</h1>
                <form name="add-movie" onSubmit={e =>
                  {this.props.onSaveClick(e,
                      title.value, year.value,
                      url.value, director.value
                  )}}>
                    <div className="form-group">
                        <span className="col-sm-2 control-label">Title</span>
                        <input type="text" ref={node => {title = node}}/>
                    </div>
                    <div className="form-group">
                        <span className="col-sm-2 control-label">Year</span>
                        <input type="text" ref={node => {year = node}}/>
                    </div>
                    <div className="form-group">
                        <span className="col-sm-2 control-label">Url</span>
                        <input type="text" ref={node => {url = node}}/>
                    </div>
                    <div className="form-group">
                        <span className="col-sm-2 control-label">Director</span>
                        <input type="text" ref={node => {director = node}}/>
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

import React from 'react';

class InsertMoviePage extends React.Component {

  render() {
    let title = { de: '', en: '', fr: '', default: '' };
    let year;
    let url;
    let director;
    return (
      <div className="container page insert">
        <h3>{'Add a new movie'}</h3>
        <form
          name="add-movie"
          onSubmit={
          (e) => {
            this.props.onSaveClick(e,
              {
                de: title.de.value,
                en: title.en.value,
                fr: title.fr.value,
                default: title.default.value,
              },
              year.value,
              url.value,
              director.value,
              this.props.router,
            );
          }}
        >
          <fieldset>
            <div className="formGroup">
              <span className="col-sm-2 control-label">Title (de)</span>
              <input type="text" ref={(node) => { title.de = node; }} />
              <span className="col-sm-2 control-label">Title (en)</span>
              <input type="text" ref={(node) => { title.en = node; }} />
              <span className="col-sm-2 control-label">Title (fr)</span>
              <input type="text" ref={(node) => { title.fr = node; }} />
              <span className="col-sm-2 control-label">Title (default)</span>
              <input
                type="text" ref={(node) => { title.default = node; }}
              />
            </div>
          </fieldset>
          <div className="formGroup">
            <span className="col-sm-2 control-label">Year</span>
            <input type="text" ref={(node) => { year = node; }} />
          </div>
          <div className="formGroup">
            <span className="col-sm-2 control-label">Url</span>
            <input type="text" ref={(node) => { url = node; }} />
          </div>
          <div className="formGroup">
            <span className="col-sm-2 control-label">Director</span>
            <input type="text" ref={(node) => { director = node; }} />
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <input type="submit" value="add" className="btn btn-default" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

InsertMoviePage.propTypes = {
  onSaveClick: React.PropTypes.func,
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }),
};

export default InsertMoviePage;

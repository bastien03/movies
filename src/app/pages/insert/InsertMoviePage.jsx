import React from 'react';

import SelectAwards from '../../components/movies/awards/SelectAwardsComponent';

class InsertMoviePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movie: {},
    };
  }

  handleAwardsChange(award, checked) {
    const awards = new Set(this.state.movie.awards);
    if (checked) {
      awards.add(award);
    } else {
      awards.delete(award);
    }

    const newState = Object.assign({}, this.state.movie, {
      awards: Array.from(awards),
    });
    this.setState({ movie: newState });
  }

  render() {
    const title = { de: '', en: '', fr: '', default: '' };
    let year;
    let url;
    let director;
    let country;
    let awards;
    return (
      <div className="insertPage">
        <h1>{'Add a new movie'}</h1>
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
              country.value,
              this.state.movie.awards,
              this.props.router,
            );
          }}
        >
          <fieldset>
            <legend>{'title'}</legend>
            <div className="formGroup">
              <span className="col-xs-12 col-sm-12 control-label">Title (de)</span>
              <input type="text" ref={(node) => { title.de = node; }} />
              <span className="col-xs-12 col-sm-12 control-label">Title (en)</span>
              <input type="text" ref={(node) => { title.en = node; }} />
              <span className="col-xs-12 col-sm-12 control-label">Title (fr)</span>
              <input type="text" ref={(node) => { title.fr = node; }} />
            </div>
          </fieldset>
          <div className="formGroup">
            <span className="col-xs-12 col-sm-12 control-label">Year</span>
            <input type="text" ref={(node) => { year = node; }} />
          </div>
          <div className="formGroup">
            <span className="col-xs-12 col-sm-12 control-label">Url</span>
            <input type="text" ref={(node) => { url = node; }} />
          </div>
          <div className="formGroup">
            <span className="col-xs-12 col-sm-12 control-label">Director</span>
            <input type="text" ref={(node) => { director = node; }} />
          </div>
          <div className="formGroup">
            <span className="col-xs-12 col-sm-12 control-label">Country</span>
            <input type="text" ref={(node) => { country = node; }} />
          </div>
          <div className="formGroup">
            <span className="col-xs-12 col-sm-12 control-label">Awards</span>
            <SelectAwards
              movieAwards={awards}
              onChange={(...args) => this.handleAwardsChange(...args)}
            />
          </div>
          <div className="form-group">
            <div>
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

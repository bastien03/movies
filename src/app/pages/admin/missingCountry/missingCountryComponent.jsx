import React from 'react';
import { getTitle } from '../../../components/movies/MovieTitle';

class MissingCountryComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      moviesWithoutCountry: {},
      show: false,
    };
  }

  componentDidMount() {
    this.loadMovies();
  }

  loadMovies() {
    this.props.loadMoviesWithMissingCountry()
      .then((movies) => {
        const moviesHash = {};
        movies.forEach((m) => { moviesHash[m.id] = m; });
        this.setState({
          moviesWithoutCountry: moviesHash,
        });
      });
  }

  saveCountry(id) {
    const country = this.state.moviesWithoutCountry[id].country;
    this.props.patchMovieCountry(id, country).then(() => {
      this.loadMovies();
    });
  }

  handleChange(id, value) {
    const newState = Object.assign({}, this.state.moviesWithoutCountry, {
      [id]: Object.assign({}, this.state.moviesWithoutCountry[id], {
        country: value,
      }),
    });
    this.setState({ moviesWithoutCountry: newState });
  }

  render() {
    const language = this.props.lang;
    const showList = this.state.show;
    const moviesWithoutCountry = this.state.moviesWithoutCountry;
    const numberMovies = Object.keys(moviesWithoutCountry) ?
      Object.keys(moviesWithoutCountry).length : 0;
    const editMovies = Object.keys(moviesWithoutCountry).map((id, idx) => {
      const m = moviesWithoutCountry[id];
      return (
        <tr key={m.id}>
          <td>
            {idx + 1 }
          </td>
          <td>
            <div>
              {getTitle(m.title, language)}
            </div>
          </td>
          <td>
            <input
              type="text" name={`country_${m.id}`}
              value={m.country}
              onChange={e => this.handleChange(m.id, e.target.value)}
            />
          </td>
          <td>
            <button onClick={() => this.saveCountry(m.id)} >{'Save'}</button>
          </td>
        </tr>
      );
    });

    const showHide = () => {
      this.setState({ show: !showList });
    };

    return (
      <div>
        <h3>{`${numberMovies} Movies with missing country `}
          <button onClick={() => showHide()}>
            {!showList && 'show'}
            {showList && 'hide'}
          </button>
        </h3>
        { showList &&
          <table className="table">
            <tbody>
              <tr>
                <th>{''}</th>
                <th>{'title'}</th>
                <th>{'country'}</th>
                <th>{''}</th>
                <th>{''}</th>
              </tr>
              {editMovies}
            </tbody>
          </table>
        }
      </div>
    );
  }
}

MissingCountryComponent.propTypes = {
  loadMoviesWithMissingCountry: React.PropTypes.func.isRequired,
  patchMovieCountry: React.PropTypes.func.isRequired,
  lang: React.PropTypes.string.isRequired,
};

export default MissingCountryComponent;

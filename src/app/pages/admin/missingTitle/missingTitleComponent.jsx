import React from 'react';

class AdminPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: {},
      show: false,
    };
  }

  componentDidMount() {
    this.loadMovies();
  }

  loadMovies() {
    this.props.loadMoviesWithMissingTitles()
      .then((movies) => {
        const moviesHash = {};
        movies.forEach((m) => { moviesHash[m.id] = m; });
        this.setState({ movies: moviesHash });
      });
  }

  save(id) {
    const movie = this.state.movies[id];
    this.props.saveMovie(id, movie).then(() => {
      this.loadMovies();
    });
  }

  handleChange(id, name, value) {
    const newState = Object.assign({}, this.state.movies, {
      [id]: Object.assign({}, this.state.movies[id], {
        title: Object.assign({}, this.state.movies[id].title, {
          [name]: value,
        }),
      }),
    });
    this.setState({ movies: newState });
  }
  render() {
    const movies = this.state.movies;
    const showList = this.state.show;
    const numberMovies = Object.keys(movies) ? Object.keys(movies).length : 0;
    const editMovies = Object.keys(movies).map((id, idx) => {
      const m = movies[id];
      return (
        <tr key={m.id}>
          <td>
            {idx + 1 }
          </td>
          <td>
            <input
              type="text" name={`title_de_${m.id}`}
              value={m.de} onChange={e => this.handleChange(id, 'de', e.target.value)}
              defaultValue={m.title.de ? m.title.de : 'Titel'}
            />
          </td>
          <td>
            <input
              type="text" name={`title_en_${m.id}`}
              value={m.en} onChange={e => this.handleChange(id, 'en', e.target.value)}
              defaultValue={m.title.en ? m.title.en : 'title'}
            />
          </td>
          <td>
            <input
              type="text" name={`title_fr_${m.id}`}
              value={m.fr} onChange={e => this.handleChange(id, 'fr', e.target.value)}
              defaultValue={m.title.fr ? m.title.fr : 'titre'}
            />
          </td>
          <td>
            <div className="defaultTitle">{m.title.default}</div>
          </td>
          <td>
            <button onClick={() => this.save(m.id)} >{'Save'}</button>
          </td>
        </tr>
      );
    });
    const showHide = () => {
      this.setState({ show: !showList });
    };
    return (
      <div>
        <h3>{`${numberMovies} Movies with missing titles `}
          <button onClick={() => showHide()}>
            {!showList && 'show'}
            {showList && 'hide'}
          </button>
        </h3>
        {showList &&
          <table className="table">
            <tbody>
              <tr>
                <th>{''}</th>
                <th>{'de'}</th>
                <th>{'en'}</th>
                <th>{'fr'}</th>
                <th>{'default'}</th>
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

AdminPage.propTypes = {
  loadMoviesWithMissingTitles: React.PropTypes.func.isRequired,
  saveMovie: React.PropTypes.func.isRequired,
};

export default AdminPage;

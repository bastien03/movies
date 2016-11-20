import React from 'react';

class AdminPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    this.props.loadMoviesWithMissingTitles().then(movies => this.setState({
      movies,
    }));
  }

  render() {
    const movies = this.state.movies;
    const editMovies = movies.map(m =>
      <fieldset key={m.id}>

        <input name={`title_de_${m.id}`} value={m.title.de ? m.title.de : 'Titel'} />
        <input name={`title_en_${m.id}`} value={m.title.en ? m.title.en : 'title'} />
        <input name={`title_fr_${m.id}`} value={m.title.fr ? m.title.fr : 'titre'} />
        <span>&nbsp;</span>
        <input value={m.title.default} disabled />
      </fieldset>,
    );
    return (
      <div>
        {editMovies}
      </div>
    );
  }
}

AdminPage.propTypes = {

};

export default AdminPage;

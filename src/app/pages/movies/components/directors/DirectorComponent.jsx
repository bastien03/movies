import React from 'react';
import { Link } from 'react-router';

const DirectorComponent = ({ name, numberMovies }) =>
  <Link to={`/movies/${name}`}>{name}({numberMovies})</Link>;

DirectorComponent.propTypes = {
  name: React.PropTypes.string.isRequired,
  numberMovies: React.PropTypes.number.isRequired,
};

export default DirectorComponent;

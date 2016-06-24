import React from 'react';

const DirectorComponent = ({ name, numberMovies }) => (
  <div>
    {name}({numberMovies})
  </div>
);

DirectorComponent.propTypes = {
  name: React.PropTypes.string,
  numberMovies: React.PropTypes.number,
};

export default DirectorComponent;

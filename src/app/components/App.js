import React from 'react';
import Header from './header/HeaderContainer';

const App = ({ children }) => (
  <div className="container-fluid">
    <Header />
    {children}
  </div>
);

App.propTypes = {
  children: React.PropTypes.element,
};

export default App;

import React from 'react';
import LoadingBar from 'react-redux-loading-bar';
import Header from './header/HeaderContainer';

const App = ({ children }) => (
  <div className="container-fluid">
    <LoadingBar />
    <Header />
    {children}
  </div>
);

App.propTypes = {
  children: React.PropTypes.element,
};

export default App;

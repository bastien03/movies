import React from 'react';
import MissingCountryComponent from './missingCountry/missingCountryContainer';
import MissingTitleComponent from './missingTitle/missingTitleContainer';

const AdminPage = ({ lang }) => (
  <div className="adminPage">
    <h1>Admin</h1>
    <MissingTitleComponent lang={lang} />
    <MissingCountryComponent lang={lang} />
  </div>
);
AdminPage.propTypes = {
  lang: React.PropTypes.string.isRequired,
};

export default AdminPage;

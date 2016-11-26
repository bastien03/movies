import React from 'react';

const LanguageSelector = ({ lang, setLanguage }) => {
  const isChecked = language => lang === language ? 'checked' : '';
  const onChange = language => setLanguage(language);
  return (
    <form>
      <input type="radio" name="gender" value="male" checked={isChecked('de')} onChange={() => onChange('de')} />de
      <input type="radio" name="gender" value="female" checked={isChecked('en')} onChange={() => onChange('en')} />en
      <input type="radio" name="gender" value="other" checked={isChecked('fr')} onChange={() => onChange('fr')} />fr
    </form>
  );
};

LanguageSelector.propTypes = {
  lang: React.PropTypes.string,
  setLanguage: React.PropTypes.func,
};

export default LanguageSelector;

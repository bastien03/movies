import React from 'react';

const LanguageSelector = ({ lang, setLanguage }) => {
  const isChecked = language => lang === language ? 'checked' : '';
  const onChange = e => setLanguage(e.target.value);
  return (
    <form>
      <select name="selectLang" onChange={e => onChange(e)}>
        <option value="english" checked={isChecked('en')}>en</option>
        <option value="german" checked={isChecked('de')}>de</option>
        <option value="fr" checked={isChecked('fr')}>fr</option>
      </select>
    </form>
  );
};

LanguageSelector.propTypes = {
  lang: React.PropTypes.string,
  setLanguage: React.PropTypes.func,
};

export default LanguageSelector;

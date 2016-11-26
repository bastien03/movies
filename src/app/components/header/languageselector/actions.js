function languageAction(lang) {
  return {
    type: 'SET_LANGUAGE',
    data: lang,
  };
}

function setLanguage(language) {
  return (dispatch) => {
    dispatch(languageAction(language));
  };
}

export default setLanguage;

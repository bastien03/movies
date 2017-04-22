import React from 'react';

export const getTitle = (title, lang) => {
  if (title[lang]) {
    return title[lang];
  }

  return `◦◦◦${title.default}◦◦◦`;
};

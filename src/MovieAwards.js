// List of film festivals which are supported by our project.
export const AWARDS = ['cannes', 'berlin', 'venice'];

const isAwardValid = award => AWARDS.includes(award.name) && !!award.year;
export const isAwardListValid = awards => awards.every(isAwardValid);

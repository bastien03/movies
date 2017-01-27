// List of film festivals which are supported by our project.
export const AWARDS = ['cannes', 'berlin', 'venice'];

export const isAwardValid = awards => awards.every(award => AWARDS.includes(award));

// List of film festivals which are supported by our project.
export const AWARDS = ['Cannes', 'Berlin', 'Venice'];

export const isAwardValid = awards => awards.every(award => AWARDS.includes(award));

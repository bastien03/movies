module.exports = function(db) {
    db.addCollection('users');
    db.getCollection('users').insert(require('../data/users.json'));
    db.saveDatabase();
};

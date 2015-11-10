module.exports = function(db) {

    var login = function(username, password) {
        var user = db.getCollection('users').find({username: username});
        return user.length >= 1 ? user[0] : null;
    };

    var getUserById = function(id) {
        return db.getCollection('users').get(id);
    };

    return {
        login: login,
        getUserById: getUserById
    }
};
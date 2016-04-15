import {ObjectID} from 'mongodb';

module.exports = function(db) {

    var login = function(username, password, callback) {
        db.collection('users').find({username: username}).limit(1).next(function(err, user) {
            callback(user);
        });
    };

    var getUserById = function(id, callback) {
        db.collection('users').find({_id: ObjectID(id)}).limit(1).next(function(err, user) {
            callback(user);
        });
    };

    return {
        login: login,
        getUserById: getUserById
    }
};
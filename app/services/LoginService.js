import getDbInstance from '../dbManager';
import {ObjectID} from 'mongodb';

export function login(username, password, callback) {
    getDbInstance().collection('users').find({username: username}).limit(1).next(function(err, user) {
        callback(user);
    });
}

export function getUserById(id, callback) {
    getDbInstance().collection('users').find({_id: ObjectID(id)}).limit(1).next(function(err, user) {
        callback(user);
    });
}

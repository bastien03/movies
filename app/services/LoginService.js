import getDbInstance from '../dbManager';
import {ObjectID} from 'mongodb';

let db = getDbInstance();

export function login(username, password, callback) {
    db.collection('users').find({username: username}).limit(1).next(function(err, user) {
        callback(user);
    });
}

export function getUserById(id, callback) {
    db.collection('users').find({_id: ObjectID(id)}).limit(1).next(function(err, user) {
        callback(user);
    });
}

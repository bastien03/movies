import User from '../domain/User';

const findById = userId => User.findById(userId);
const findByName = username => User.findOne({ username });

const repo = {
  findById,
  findByName,
};

export default repo;

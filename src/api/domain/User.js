import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// movie schema definition
const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: false },
  },
  {
    versionKey: false,
  }
);

UserSchema.method('toJSON', function deleteMongoId() {
  const user = this.toObject();
  user.id = user._id; // eslint-disable-line no-underscore-dangle
  delete user._id; // eslint-disable-line no-underscore-dangle
  return user;
});

// Exports the UserSchema for use elsewhere.
module.exports = mongoose.model('user', UserSchema);

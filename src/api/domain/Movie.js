import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// movie schema definition
const MovieSchema = new Schema(
  {
    title: { type: String, required: true },
    director: { type: String, required: true },
    year: { type: Number, required: true },
    url: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

MovieSchema.method('toJSON', function deleteMongoId() {
  const user = this.toObject();
  user.id = user._id; // eslint-disable-line no-underscore-dangle
  delete user._id; // eslint-disable-line no-underscore-dangle
  return user;
});

// Exports the MovieSchema for use elsewhere.
module.exports = mongoose.model('movie', MovieSchema);

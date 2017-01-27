import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// movie schema definition
const MovieSchema = new Schema(
  {
    title: {
      de: { type: String, required: false },
      en: { type: String, required: false },
      fr: { type: String, required: false },
      default: { type: String, required: true },
    },
    director: { type: String, required: true },
    year: { type: Number, required: true },
    url: { type: String, required: true },
    country: { type: String, required: false },
    awards: [{
      name: { type: String, required: true },
      year: { type: Number, required: true },
    }],
  },
  {
    versionKey: false,
  },
);

MovieSchema.method('toJSON', function deleteMongoId() {
  const movie = this.toObject();
  movie.id = movie._id; // eslint-disable-line no-underscore-dangle
  delete movie._id; // eslint-disable-line no-underscore-dangle
  return movie;
});

// Exports the MovieSchema for use elsewhere.
module.exports = mongoose.model('movie', MovieSchema);

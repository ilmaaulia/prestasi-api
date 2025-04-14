const { model, Schema, mongoose } = require('mongoose');

const newsSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: 'Image',
      default: null,
    },
  },
  { timestamps: true },
);

module.exports = model('News', newsSchema);



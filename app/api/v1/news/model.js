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
      default: '67fdaad050d25868ad5e6e4a',
    },
  },
  { timestamps: true },
);

module.exports = model('News', newsSchema);



const { model, Schema, mongoose } = require('mongoose');

const newsSchema = Schema(
  {
    title: {
      type: String,
      required: [true, 'Judul berita harus diisi'],
    },
    content: {
      type: String,
      required: [true, 'Konten berita harus diisi'],
    },
    author: {
      type: String,
      required: [true, 'Penulis berita harus diisi'],
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



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
      default: '683a59e5a93b1384cae0f66c',
    },
  },
  { timestamps: true },
);

module.exports = model('News', newsSchema);



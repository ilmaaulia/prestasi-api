const { model, Schema, mongoose } = require('mongoose');

const newsSchema = Schema(
  {
    title: {
      type: String,
      required: [true, 'Judul berita harus diisi'],
      trim: true,
      minlength: [5, 'Panjang judul minimal 5 karakter'],
      maxlength: [200, 'Panjang judul maksimal 200 karakter'],
    },
    content: {
      type: String,
      required: [true, 'Konten berita harus diisi'],
      trim: true,
      minlength: [20, 'Panjang konten minimal 20 karakter'],
      maxlength: [2000, 'Panjang konten maksimal 2000 karakter'],
    },
    author: {
      type: String,
      required: [true, 'Penulis berita harus diisi'],
      trim: true,
      minlength: [3, 'Panjang nama penulis minimal 3 karakter'],
      maxlength: [100, 'Panjang nama penulis maksimal 100 karakter'],
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



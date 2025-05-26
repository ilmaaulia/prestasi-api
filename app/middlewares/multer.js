const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary } = require('../config');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'prestasi',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    public_id: (_req, _file) => `${Date.now()}`,
  },
});

const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 },
});

module.exports = uploadMiddleware;

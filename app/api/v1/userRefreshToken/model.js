const mongoose = require('mongoose');

const userRefreshTokenSchema = new mongoose.Schema(
  {
    refreshToken: {
      type: String,
    },
    userType: {
      type: String,
      required: true,
      enum: ['Student', 'Admin'],
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      refPath: 'userType',
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('UserRefreshToken', userRefreshTokenSchema);

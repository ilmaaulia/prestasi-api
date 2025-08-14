const { model, Schema } = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, 'Panjang nama minimal 3 karakter'],
    maxlength: [100, 'Panjang nama maksimal 100 karakter'],
  },
  email: {
    type: String,
    required: [true, 'Email harus diisi'],
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: [254, 'Panjang email maksimal 254 karakter'],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Panjang password minimal 6 karakter'],
    maxlength: [128, 'Panjang password maksimal 128 karakter'],
  },
});

adminSchema.pre('save', async function(next) {
  const Admin = this;
  if (Admin.isModified('password')) {
    Admin.password = await bcrypt.hash(Admin.password, 12);
  }
  next();
});

adminSchema.methods.comparePassword = async function(candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = model('Admin', adminSchema);

const { model, Schema } = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
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

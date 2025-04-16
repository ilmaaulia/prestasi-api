const { model, Schema } = require('mongoose');
const bcrypt = require('bcryptjs');

const studentSchema = Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Nama depan wajib diisi'],
    },
    lastName: {
      type: String,
    },
    student_id: {
      type: String,
      unique: true,
      required: [true, 'NIM harus diisi'],
      minlength: [8, 'NIM harus 8 karakter'],
      maxlength: [8, 'NIM harus 8 karakter'],
    },
    study_program: {
      type: String,
      enum: [
        'Pendidikan Biologi',
        'Pendidikan Fisika',
        'Pendidikan Matematika',
        'Pendidikan Teknologi Informasi',
        'Sistem Informasi',
        'Pendidikan Bahasa dan Sastra Indonesia',
        'Pendidikan Bahasa Inggris',
        'Pendidikan Guru Sekolah Dasar',
        'Pendidikan IPS',
        'Pendidikan Pancasila dan Kewarganegaraan',
      ],
      required: [true, 'Program studi harus diisi'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email harus diisi'],
      match: [/\S+@\S+\.\S+/, 'Format email tidak valid'],
    },
    password: {
      type: String,
      required: [true, 'Password harus diisi'],
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: 'Image',
      default: '678b26194dc93fd4bf539b5c',
    },
    status: {
      type: String,
      enum: ['Aktif', 'Tidak Aktif'],
      default: 'Tidak Aktif',
    },
    otp: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

studentSchema.virtual('achievements', {
  ref: 'Achievement',
  localField: '_id',
  foreignField: 'student',
});

studentSchema.pre('save', async function(next) {
  const User = this;
  if (User.isModified('password')) {
    User.password = await bcrypt.hash(User.password, 12);
  }
  next();
});

studentSchema.methods.comparePassword = async function(candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

studentSchema.set('toObject', { virtuals: true });
studentSchema.set('toJSON', { 
  virtuals: true,
  transform: (doc, data) => {
    delete data.password;
    return data;
  },
});

module.exports = model('Student', studentSchema);

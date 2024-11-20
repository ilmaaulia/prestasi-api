const { model, Schema } = require('mongoose');

const studentSchema = Schema ({
	name: {
		type: String,
		required: [true, 'Nama lengkap harus diisi']
	},
	student_id: {
		type: String,
		required: true,
		unique: [true, 'NIM harus diisi'],
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
		required: true,
		unique: [true, 'Email harus diisi'],
		match: [/\S+@\S+\.\S+/, 'Email tidak valid'],
	},
	password: {
		type: String,
		required: [true, 'Password harus diisi'],
	},
	achievements: [{
    type: Schema.Types.ObjectId,
    ref: 'Achievement',
  }],
	image: {
		type: Schema.Types.ObjectId,
		ref: 'Image',
		default: '67286e1b93f5359c0df7f267',
	},
});

module.exports = model('Student', studentSchema);
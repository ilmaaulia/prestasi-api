const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const activityGroupEnum = ['Akademik', 'Non-akademik'];
const activityTypeEnum = ['Aktivitas Kemahasiswaan', 'Kompetisi', 'PKM'];
const achievementTypeEnum = ['Science', 'Seni', 'Olahraga', 'Lainnya'];
const competitionLevelEnum = ['Internasional', 'Nasional', 'Regional', 'Lainnya'];
const statusEnum = ['Belum Divalidasi', 'Valid', 'Tidak Valid'];

let achievementSchema = Schema(
  {
    name: {
      type: String,
      minlength: [6, 'Panjang nama prestasi minimal 6 karakter'],
      required: [true, 'Nama prestasi harus diisi'],
    },
    date: {
      type: Date,
      required: [true, 'Tanggal prestasi harus diisi'],
    },
    activity_group: {
      type: String,
      enum: activityGroupEnum,
      required: [true, 'Kelompok aktivitas harus diisi'],
    },
    activity_type: {
      type: String,
      enum: activityTypeEnum,
      required: [true, 'Jenis aktivitas harus diisi'],
    },
    achievement_type: {
      type: String,
      enum: achievementTypeEnum,
      required: [true, 'Jenis prestasi harus diisi'],
    },
    competition_level: {
      type: String,
      enum: competitionLevelEnum,
      required: [true, 'Tingkat kompetisi harus diisi'],
    },
    status: {
      type: String,
			enum: statusEnum,
			default: 'Belum Divalidasi',
    },
  },
  { timestamps: true }
);

module.exports = model('Achievement', achievementSchema);

const mongoose = require('mongoose');
const { cloudinary } = require('../../config');
const Images = require('../../api/v1/images/model');
const Achievements = require('../../api/v1/achievements/model');
const News = require('../../api/v1/news/model');
const Students = require('../../api/v1/students/model');

const { urlDb } = require('../../config');

async function cleanupUnusedImages() {
  await mongoose.connect(urlDb);
  const allImages = await Images.find();

  for (const img of allImages) {
    const usedInAchievement = await Achievements.exists({ image: img._id });
    const usedInNews = await News.exists({ image: img._id });
    const usedInStudent = await Students.exists({ image: img._id });

    if (!usedInAchievement && !usedInNews && !usedInStudent) {
      if (img.name) {
        let publicId = img.name;
        if (publicId.startsWith('http')) {
          publicId = publicId.split('/upload/')[1]; 
          publicId = publicId.split('/').slice(1).join('/');
          publicId = publicId.replace(/\.[^/.]+$/, '');
        }
        await cloudinary.uploader.destroy(publicId);
        
      }
      await Images.deleteOne({ _id: img._id });
    }
  }
  await mongoose.disconnect();
}

cleanupUnusedImages();

const Achievements = require('../../api/v1/achievements/model');
const { NotFoundError, BadRequestError } = require('../../errors');

const createAchievements = async req => {
  const {
    name,
    date,
    activity_group,
    activity_type,
    achievement_type,
    competition_level,
    student,
    image,
  } = req.body;

  const result = await Achievements.create({
    name,
    date,
    activity_group,
    activity_type,
    achievement_type,
    competition_level,
    student,
    image,
  });

  return result;
};

const getAllAchievements = async req => {
  const {
    activity_group,
    activity_type,
    achievement_type,
    competition_level,
    sort,
    limit,
    student,
    keyword,
  } = req.query;

  let condition = {};

  if (activity_group) {
    condition.activity_group = activity_group;
  }

  if (activity_type) {
    condition.activity_type = activity_type;
  }

  if (achievement_type) {
    condition.achievement_type = achievement_type;
  }

  if (competition_level) {
    condition.competition_level = competition_level;
  }

  if (student) {
    condition.student = student;
  }

  if (keyword) {
    condition = { ...condition, name: { $regex: keyword, $options: 'i' } };
  }

  let query = Achievements.find(condition)
    .populate({ path: 'student', select: 'firstName lastName' })
    .populate({ path: 'image', select: 'name' });

  if (sort) {
    const sortCriteria = {};
    const [field, order] = sort.split(':');
    sortCriteria[field] = order === 'desc' ? -1 : 1;
    query = query.sort(sortCriteria);
  }

  if (limit) {
    const parsedLimit = parseInt(limit, 10);
    if (!isNaN(parsedLimit) && parsedLimit > 0) {
      query = query.limit(parsedLimit);
    }
  }

  const result = await query;

  return result;
};

const getOneAchievement = async req => {
  const { id } = req.params;

  const result = await Achievements.findOne({ _id: id })
    .populate({ path: 'student', select: 'name' })
    .populate({ path: 'image', select: 'name' });

  if (!result) throw new NotFoundError(`Tidak ada prestasi dengan id ${id}`);

  return result;
};

const updateAchievements = async req => {
  const { id } = req.params;

  const {
    name,
    date,
    activity_group,
    activity_type,
    achievement_type,
    competition_level,
    status,
    student,
    image,
  } = req.body;

  const result = await Achievements.findOneAndUpdate(
    { _id: id },
    {
      name,
      date,
      activity_group,
      activity_type,
      achievement_type,
      competition_level,
      status,
      student,
      image,
    },
    { new: true, runValidators: true },
  )
    .populate({ path: 'student', select: 'name' })
    .populate({ path: 'image', select: 'name' });

  if (!result) throw new NotFoundError(`Tidak ada prestasi dengan id ${id}`);

  return result;
};

const deleteAchievements = async req => {
  const { id } = req.params;

  const result = await Achievements.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada prestasi dengan id ${id}`);

  await result.deleteOne();

  return result;
};

const updateAchievementStatus = async req => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['Belum Divalidasi', 'Valid', 'Tidak Valid'].includes(status)) {
    throw new BadRequestError('Status tidak valid');
  }

  const checkAchievement = await Achievements.findOne({ 
    _id: id,
  });

  if (!checkAchievement) throw new NotFoundError(`Tidak ada prestasi dengan id ${id}`);

  checkAchievement.status = status;

  await checkAchievement.save();

  return checkAchievement;
};

module.exports = {
  getAllAchievements,
  createAchievements,
  getOneAchievement,
  updateAchievements,
  deleteAchievements,
  updateAchievementStatus,
};

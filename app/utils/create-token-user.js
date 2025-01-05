const createTokenUser = (user) => {
  return {
    userId: user._id,
    name: user.name,
    email: user.email,
  };
};

const createTokenStudent = (student) => {
  return {
    userId: student._id,
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email,
  };
};

module.exports = { createTokenUser, createTokenStudent };

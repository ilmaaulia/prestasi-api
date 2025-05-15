const createTokenUser = (user) => {
  return {
    userId: user._id.toString(),
    name: user.name,
    email: user.email,
    role: 'admin',
  };
};

const createTokenStudent = (student) => {
  return {
    userId: student._id.toString(),
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email,
    role: 'student',
  };
};

module.exports = { createTokenUser, createTokenStudent };

const createTokenUser = (user) => {
	return {
		userId: user._id,
		name: user.name,
		email: user.email,
	};
};

module.exports = createTokenUser;
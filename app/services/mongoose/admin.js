const Admin = require('../../api/v1/admin/model');

const createAdmin = async (req) => {
	const { name, email, password } = req.body;

	const result = await Admin.create({ name, email, password });

	return result;
}

module.exports = {
	createAdmin,
}
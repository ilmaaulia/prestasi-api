const Admin = require('../../api/v1/admin/model');

const createAdmin = async (req) => {
	const { title, content } = req.body;

	const result = await Admin.create({ title, content });

	return result;
}

module.exports = {
	createAdmin,
}
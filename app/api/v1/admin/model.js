const { model, Schema } = require('mongoose');

const adminSchema = Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
})

module.exports = model('Admin', adminSchema);
const { model, Schema } = require('mongoose');

const newsSchema = Schema(
	{
		title: {
			type: String,
			required: true
		},
		content: {
			type: String,
			required: true
		},
	},
	{ timestamps: true }
)

module.exports = model('News', newsSchema);



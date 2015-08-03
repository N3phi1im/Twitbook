var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({ 
	content: {
		type: String,
		required: true
	},
	dateDeleted: {
		type: Date,
		default: null
	},
	dateCreated: Date,
	username: {
		type: String,
		required: true
	}
});

mongoose.model('Post', PostSchema);
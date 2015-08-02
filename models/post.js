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
	dateCreated: Date
});

mongoose.model('Post', PostSchema);
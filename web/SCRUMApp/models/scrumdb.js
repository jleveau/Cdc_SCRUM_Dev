var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var users = new mongoose.Schema({
	username: String,
	mail: String,
	password: String,
	image: Buffer,
	first_name: String,
	last_name: String,
	followed_projects: [{ type : Number, ref: 'projects' }],
	date_created: Date, 
	date_updated: Date
});

var projects = new mongoose.Schema({
	member_list: [{ type :ObjectId, ref: 'users' }],
	name: { type: String, required: true },
	specification: Buffer,
	product_owner: { type :ObjectId, ref: 'users' },
	github: String,
	status: { type: String, enum: ['public', 'private'], default: 'public' },
	date_start: { type: Date, required: true },
	description: String,
	sprint_duration: { type: Number, required: true },
	date_created: { type: Date, default: Date.now },
	date_updated: { type: Date, default: Date.now }
});

var user_project = new mongoose.Schema({
	_idUser : {type : ObjectId , ref : 'users'},
	_idProject : {type : ObjectId , ref : 'projects'}
});

var sprints = new mongoose.Schema({
	date_start: Date,
	date_end: Date,
	number_sprint: Number,
	sprint_duration: Number,
	project: { type : Number, ref: 'projects' },
	date_created: { type: Date, default: Date.now },
	date_updated: { type: Date, default: Date.now }
});

var userstories = new mongoose.Schema({
	number_us: Number,
	id_project: { type : Number, ref: 'projects' },
	description: String,
	state: String,
	commit_validation: String,
	date_validation: Date, 
	priority: Number,
	estimated_cost: Number,
	sprint: { type : Number, ref: 'sprint' },
	date_created: { type: Date, default: Date.now },
	date_updated: { type: Date, default: Date.now }
});

var tasks = new mongoose.Schema({
	description: String,
	date_start: Date,
	date_end: Date,
	estimated_cost: Number,
	estimated_duration: Number,
	responsable: { type : Number, ref: 'users' },
	state: { type: String, enum: ['TODO', 'DOING', 'DONE'], default: 'public' },
	list_us: [{ type : Number, ref: 'userstories' }],
	list_tasks_depend : [{ type : Number, ref: 'tasks' }],
	date_created: { type: Date, default: Date.now },
	date_updated: { type: Date, default: Date.now }
});

//var users = mongoose.model('users', users);
//module.exports = users;


module.exports = mongoose.model('projects', projects);
module.exports = mongoose.model('userstories', userstories);
module.exports = mongoose.model('sprints', sprints);
module.exports = mongoose.model('tasks', tasks);
module.exports = mongoose.model('user_project', user_project);



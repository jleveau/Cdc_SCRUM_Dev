var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var users = new mongoose.Schema({
    username: String,
    mail: String,
    password: String,
    image: Buffer,
    first_name: String,
    last_name: String,
    followed_projects: [{type: ObjectId, ref: 'projects'}],
    date_created: Date,
    date_updated: Date
});

var projects = new mongoose.Schema({
    member_list: [{type: ObjectId, ref: 'users'}],
    name: {type: String, required: true},
    specification: Buffer,
    product_owner: {type: ObjectId, ref: 'users'},
    github: String,
    status: {type: String, enum: ['public', 'private'], default: 'public'},
    tasks: [{type: ObjectId, ref: 'tasks'}],
    date_start: {type: Date, required: true},
    description: String,
    sprint_duration: {type: Number, required: true},
    nb_sprint : {type : Number , required : true},
    date_created: {type: Date, default: Date.now},
    date_updated: {type: Date, default: Date.now}
});

var user_project = new mongoose.Schema({
    _idUser: {type: ObjectId, ref: 'users'},
    _idProject: {type: ObjectId, ref: 'projects'}
});

var sprints = new mongoose.Schema({
    date_start: Date,
    date_end: Date,
    number_sprint: Number,
    sprint_duration: Number, // On la dans le projet, faut il le remettre dans le sprint ??
    project: {type: ObjectId, ref: 'projects'},
    date_created: {type: Date, default: Date.now},
    date_updated: {type: Date, default: Date.now}
});

var userstories = new mongoose.Schema({
    number_us: {type : Number , default : 0},
    id_project: { type : ObjectId, ref: 'projects' },
    description: String,
    state: {type: String, enum: ['Valid', 'Not Valid'], default: 'Not Valid'},
    cost: Number,
    testValidation: String,
    //commit_validation: String,
    //date_validation: Date,
    priority: Number,
    estimated_cost: Number,
    sprint: { type : ObjectId, ref: 'sprints' },
    date_created: {type: Date, default: Date.now},
    date_updated: {type: Date, default: Date.now}
});

var userstories_projects = new mongoose.Schema({
    _idUserstory: {type: ObjectId, ref: 'userstories'},
    _idProject: {type: ObjectId, ref: 'projects'}
});

var userstories_tasks = new mongoose.Schema({
    _idUserstory: {type: ObjectId, ref: 'userstories'},
    _idTasks: {type: ObjectId, ref: 'tasks'}
});


var tasks = new mongoose.Schema({
    title: String,
    description: String,
    number_task: {type : Number , default : 0},
    id_project: { type : ObjectId, ref: 'projects' },
    sprint: { type : ObjectId, ref: 'sprints' },
    date_start: Date,
    date_end: Date,
    estimated_cost: Number,
    estimated_duration: Number,
    responsable: {type: ObjectId, ref: 'users'},
    state: {type: String, enum: ['TODO', 'DOING', 'DONE'], default: 'TODO'},
    list_us: [{type: ObjectId, ref: 'userstories'}],
    list_tasks_depend: [{type: ObjectId, ref: 'tasks'}],
    date_created: {type: Date, default: Date.now},
    date_updated: {type: Date, default: Date.now}
});

module.exports = mongoose.model('projects', projects);
module.exports = mongoose.model('userstories', userstories);
module.exports = mongoose.model('sprints', sprints);
module.exports = mongoose.model('tasks', tasks);
module.exports = mongoose.model('user_project', user_project);
module.exports = mongoose.model('userstories_projects', userstories_projects);
module.exports = mongoose.model('userstories_tasks', userstories_tasks);





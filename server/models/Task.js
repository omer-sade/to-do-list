const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    task_id: { type: Number, required: true , unique : true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    create_date: { type: Date, default: Date.now},
    update_date : { type: Date, default: Date.now},
    due_date: { type: Date, required: true},
    assigned_user_id : {type : Number, required: true},
    priority_id : { 
        type: Number,
        required : true,
        enum : [1,2,3,4], // Allowed values to mark priority level (1 is lowest)
    },
    status_id : { 
        type : Number,
        required : true,
        // Allowed values where (1 : draft, 2 : in progress, 3 : on hold, 4 : completed , 5 : deleted)
        enum : [1,2,3,4,5], 
    },
});


// Pre-save middleware to update the `update_date` on modifications
TaskSchema.pre('save', function (next) {
    this.update_date = Date.now();
    next();
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;

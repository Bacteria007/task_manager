const { mongoose } = require('../references/custom_refs');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Todo', 'In Progress', 'Completed'],
        default: 'Todo'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
}, { timestamps: true });

// Task model
const Task = mongoose.model('tasks', taskSchema);
module.exports = Task;

const authenticateUser = require("../middlewares/authMW");
const { express } = require("../references/custom_refs");
const Task = require("../models/TasksModel");
const User = require("../models/UserModel");
const router = express.Router();

// API endpoint for adding a new task
router.post("/add", authenticateUser, async (req, res) => {
    try {
        const { title, description } = req.body;

        // Check if the user has permission to add tasks
        const user = await User.findById(req.user._id);
        if (!user.canAddTask()) {
            return res.status(200).json({
                status: false,
                message: "User does not have permission to add tasks",
                data: {},
            });
        }

        // Create a new task
        const newTask = new Task({
            title: title,
            description: description,
            createdBy: req.user._id,
        });

        // Save the new task
        const savedTask = await newTask.save();

        // Return the saved task in the response
        res.status(200).json({
            status: true,
            message: "Task added successfully",
            data: savedTask,
        });
    } catch (error) {
        console.error(error);
        res.status(200).json({
            status: false,
            message: "Internal server error",
            data: {},
        });
    }
});
router.post("/get-tasks", authenticateUser, async (req, res) => {
    try {
        const tasks = await Task.find();
        if (tasks.length > 0) {
            res.status(200).json({
                status: true,
                message: "Task fetched successfully",
                data: tasks,
            });
        } else {
            res.status(200).json({
                status: false,
                message: "No task is added",
                data: {},
            });
        }
    } catch (error) {
        console.error(error);
        res.status(200).json({
            status: false,
            message: "Internal server error",
            data: {},
        });
    }
});
// API endpoint for updating a task
router.post("/:taskId/update", authenticateUser, async (req, res) => {
    // const { title, description,status } = req.body;
    const taskId = req.params.taskId;
    console.log('update route called', taskId);
    try {
        // Check if the user has permission to edit tasks
        const user = await User.findById(req.user._id);
        if (!user.canEditTasks()) {
            return res.status(200).json({
                status: false,
                message: "User does not have permission to edit tasks",
                data: {},
            });
        }

        // Find the task by ID
        const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
            new: true,
        });
        if (!updatedTask) {
            console.log(' if (!updatedTask) {');
            return res.status(200).json({
                status: false,
                message: "Task not found",
                data: {},
            });
        } else {
            // Return the updated task in the response
            console.log('// Return the updated task in the response');
            res.status(200).json({
                status: true,
                message: "Task updated successfully",
                data: updatedTask,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(200).json({
            status: false,
            message: "Internal server error",
            data: {},
        });
    }
});
router.post("/:taskId/task-details", authenticateUser, async (req, res) => {
    const taskId = req.params.taskId;
    try {
        console.log(taskId);
        const task = await Task.findById(taskId).populate(
            "createdBy",
            "email name role"
        );
        if (!task) {
            return res.status(200).json({
                status: false,
                message: "Task not found",
                data: {},
            });
        }
        res.status(200).json({
            status: true,
            message: "Task fetched successfully",
            data: task,
        });
    } catch (error) {
        console.error(error);
        res.status(200).json({
            status: false,
            message: "Internal server error",
            data: {},
        });
    }
});
// API endpoint for deleting a task
router.post("/:taskId/delete", authenticateUser, async (req, res) => {
    try {
        const taskId = req.params.taskId;

        // Check if the user has permission to delete tasks
        const user = await User.findById(req.user._id);
        if (!user.canDeleteTask()) {
            return res.status(200).json({
                status: false,
                message: "User does not have permission to delete tasks",
                data: {},
            });
        }

        // Find the task by ID and delete it
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({
                status: false,
                message: "Task not found",
                data: {},
            });
        }

        // Return a success message
        res.status(200).json({
            status: true,
            message: "Task deleted successfully",
            data: {},
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "Internal server error",
            data: {},
        });
    }
});

module.exports = router;

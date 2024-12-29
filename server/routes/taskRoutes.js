const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Create a new task
router.post('/', async (req, res) => {
    try {
        // Find the task with the highest task_id
        const lastTask = await Task.findOne().sort({ task_id: -1 });
        const nextTaskId = lastTask ? lastTask.task_id + 1 : 1;

        // Create a new task with the next task_id
        const newTask = new Task({ ...req.body, task_id: nextTaskId });
        await newTask.save();

        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Get all tasks
router.get('/', async (req,res) => {
    try{
        const tasks = await Task.find();
        res.status(200).json(tasks);
    }catch(error){
        res.status(500).json({ error : error.message});
    }
});

// Get task by ID
router.get('/:id', async (req,res) => {
    try{
        const task = await Task.findOne( { task_id : req.params.id});
        if(!task)
            return res.status(404).json({ error : 'Task not found :('});
        res.status(200).json(task);
    }catch(error){
        res.status(500).json({ error : error.message});
    }
});


// Delete task by ID
router.put('/:id', async (req,res) => {
    try{
        // Find the task by task_id
        const task = await Task.findOne({ task_id: Number(req.params.id) });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Check if the task is already deleted
        if (task.status_id === 5) {
            return res.status(400).json({ error: 'Task already deleted' });
        }

        // Check if status_id is provided in the request body
        if (!req.body.status_id) {
            return res.status(400).json({ error: 'status_id is required' });
        }

        // Update the task's status_id to "Deleted"
        task.status_id = req.body.status_id; // Set the new status
        task.update_date = new Date(); // Update the timestamp
        await task.save();

        res.status(200).json({ message: 'Task marked as deleted', task });

    }catch(error){
        res.status(400).json({ error : error.message});
    }
});

module.exports = router;
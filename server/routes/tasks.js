const db = require("../models");
const Task = db.tasks;
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const taskAttrs = {
            task: req.body.task,
            description: 'dummyText',
            completed: false,
        }
        const task = await Task.create(taskAttrs);
        res.send(task);
    } catch (error) {
        res.send(error);
    }
});

router.get("/", async (req, res) => {
    try {
        console.log('hello')
        const tasks = await Task.findAll({
            order: [['id', 'desc']],
        });
        console.log('tasks - ', tasks)
        res.send(tasks);
    } catch (error) {
        console.log(error)
        res.send(error);
    }
});

router.put("/:id", async (req, res) => {
    console.log(req.body);
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) {
            throw new Error('Task not found');
        }
        task.completed = req.body.completed;
        await task.save();
        res.send(task);
    } catch (error) {
        res.send(error);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        console.log('param', req.params.id);
        const task = await Task.findByPk(req.params.id);
        if (!task) {
            console.log('not found');
            throw new Error('Task not found');
        }

        console.log('task to delete - ', task, 'param', req.params.id);

        await Task.destroy({
            where: {
                id: req.params.id
            }
        });
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;

const db = require("../models");
const Task = db.tasks;
const express = require("express");
const router = express.Router();
const JWT_SECRET = "goK!pusp6ThEsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";
const jsonwebtoken = require("jsonwebtoken");

const decodeToken = (token) => {
    try {
        return jsonwebtoken.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('JWT malformed')
    }
}


const acls = ['READ_ONLY', 'BASIC', 'OVERWRITE'];

const hasRequiredAccess = (userPermission, requiredAccess) => {
    const userACL = userPermission.taskACL[0];
    const isAdmin = userPermission.isAdmin;

    if (isAdmin) {
        return true;
    }

    if (acls.indexOf(userACL) >= acls.indexOf(requiredAccess) ) {
        return true;
    }

    return false;
}

router.post("/", async (req, res) => {
    console.log('req header ', req.header('authorization'));
    const token = req.header('authorization').split(' ')[1];
    console.log('token - ', token)
    const decoded = decodeToken(token);
    console.log('decoded - ', decoded);
    const minACL = 'BASIC';
    const hasAccess = hasRequiredAccess(decoded, minACL);

    if (!hasAccess) {
        return res.status(403).send({message: 'Unauthorized'});
    }

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
    const token = req.header('authorization').split(' ')[1];
    
    const decoded = decodeToken(token);
    const minACL = 'READ_ONLY';
    const hasAccess = hasRequiredAccess(decoded, minACL);

    if (!hasAccess) {
        return res.status(403).send({message: 'Unauthorized'});
    }

    try {
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
    const token = req.header('authorization').split(' ')[1];
    console.log('token - ', token)
    const decoded = decodeToken(token);
    const minACL = 'BASIC';
    const hasAccess = hasRequiredAccess(decoded, minACL);

    if (!hasAccess) {
        return res.status(403).send({message: 'Unauthorized'});
    }
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
        const token = req.header('authorization').split(' ')[1];
        console.log('token - ', token)
        const decoded = decodeToken(token);
        const minACL = 'OVERWRITE';
        const hasAccess = hasRequiredAccess(decoded, minACL);

        if (!hasAccess) {
            return res.status(403).send({message: 'Unauthorized'});
        }
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
        res.send({message: 'task deleted'});
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;

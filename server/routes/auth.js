const db = require("../models");
const User = db.users;
const Role = db.roles;
const UserGroups = db.usergroups;
const Group = db.groups;
const express = require("express");
const router = express.Router();

const jsonwebtoken = require("jsonwebtoken");
const JWT_SECRET = "goK!pusp6ThEsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";

const calculatePermission = (roles) => {
    const acls = ['READ_ONLY', 'BASIC', 'OVERWRITE'];
    let maxRank = 0;
    let isAdmin = false;

    roles.forEach(role => {
        if (role.isadmin) {
            isAdmin = true;
        }
        const roleacl = role.taskacl ? role.taskacl[0] : 'READ_ONLY';
        const aclRank = acls.indexOf(roleacl);
        if (aclRank > maxRank) {
            maxRank = aclRank
        }
    });

    console.log('max rank - ', maxRank);
    console.log('max acl - ', acls[maxRank]);
    console.log('is admin - ', isAdmin);

    return {
        isAdmin,
        taskACL: acls[maxRank],
    }
}


router.post("/", async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email,
                password: req.body.password,
            }
        });



        if (!user) {
            return res.status(400).send({ message: 'Invalid User' });
        }

        const userGroups = await UserGroups.findAll({
            where: {
                userid: user.id,
            }
        })
        console.log('userGroups - ', userGroups);

        const groupIds = userGroups.map(d => d.groupid);

        console.log('groupIds - ', groupIds);

        const groups = await Group.findAll({
            where: {
                id: groupIds,
            }
        });
        console.log('groups - ', groups);

        const roleIds = groups.map(g => g.roleid);

        let allRoleIds = [user.roleid];

        if (roleIds.length) {
            allRoleIds.push(...roleIds);
        }

        console.log('allRoleIds - ', allRoleIds);

        const roles = await Role.findAll({
            where: {
                id: allRoleIds,
            },
        });

        console.log('roles - ', JSON.stringify(roles));



        const permission = calculatePermission(roles)

        const token = jsonwebtoken.sign({
            email: user.email,
            isAdmin: permission.isAdmin,
            taskACL: [permission.taskACL],
        }, JWT_SECRET);


        res.send({
            email: user.email,
            isAdmin: permission.isAdmin,
            taskACL: [permission.taskacl],
            token
        });
    } catch (error) {
        console.log(error)
        res.send(error);
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();

const {login} = require("../controllers/users")
const {register} = require("../controllers/users")
const {getAllUsers} = require("../controllers/users")
const {logout} = require("../controllers/users")
// const {setAvatar} = require("../controllers/users")

router.post('/login',login);
router.post('/register',register);
router.get('/allusers/:id',getAllUsers);
router.get("/logout/:id", logout);
// router.post('/setavatar',setAvatar);

module.exports = router;


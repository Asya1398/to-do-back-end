const express = require('express')
const router = express.Router()
const {User} = require('../models')


router.get('/', async (req, res) => {
    try {
        const listOfUsers = await User.findAll();
        res.json(listOfUsers)
    } catch (e) {
        return res.status(500).json({message: e})
    }
})

router.post('/', async (req, res) => {
    try {
        const {name, email, phone} = req.body;
        const check = await User.findOne({
            where: {
                email
            }
        });
        if (check) {
            throw {
                message: "Email already exist !"
            }
        }
        const user = await User.create({
            name,
            email,
            phone
        });
        return res.status(201).json({
            message: "User successfully created !",
            user
        });
    } catch (e) {
        return res.status(500).json(e)
    }
})


router.post('/delete/:id', async (req, res) => {
    try {
        await User.destroy({where: {id: req.params.id}})
        res.status(200).json({})
        // res.redirect('/')
    } catch (e) {
        return res.status(500).json(e)
    }
})

router.get('/edit/:id', async (req, res) => {
    try {
        const user = await User.findOne(
            {
                where: {
                    id: req.params.id
                }
            }
        );
        res.json(user)
    } catch (e) {
        console.log(e)
    }
})

router.put('/edit', async (req, res) => {
    try {
        await User.update(
            {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone
            },
            {
                where: {id: req.body.id}
            }
        ).then(() => {
            res.send("user updated")
        })
    } catch (e) {
        return res.status(500).json(e)
    }
})

module.exports = router
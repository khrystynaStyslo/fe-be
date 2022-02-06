const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Input correct email').normalizeEmail().isEmail(),
        check('password', 'Input password').exists().isLength({ min: 6 })
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), message: 'Validation errors' })
        }

        const { email, password } = req.body
        const candidate = await User.findOne({ email })

        if (candidate) {
            return res.status(400).json({ message: "This user is already created" })
        }

        const hashedPass = await bcrypt.hash(password, 12)
        const user = new User({ email, password: hashedPass })

        await user.save()

        res.status(201).json({ message: "User created" })
    } catch (e) {
        res.status(500).json({ message: "Something wend wrong, try again" })
    }
})

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Your email is wrong').isEmail(),
        check('password', 'Minimal password length is 6 letters').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                console.log('errors', errors)
                return res.status(400).json({ errors: errors.array(), message: 'Validation errors in login' })
            }

            const { email, password } = req.body
            const candidate = await User.findOne({ email })

            if (!candidate) {
                return res.status(400).json({ message: "This user isn't created" })
            }

            const isMatch = await bcrypt.compare(password, candidate.password)

            if (!isMatch) {
                return res.status(400).json({ message: "Password is wrong, try again" })
            }

            const token = jwt.sign(
                { userId: candidate.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.json({ token, userId: candidate.id })
        } catch (e) {
            res.status(500).json({ message: "Something wend wrong, try again" })
        }
})

module.exports = router
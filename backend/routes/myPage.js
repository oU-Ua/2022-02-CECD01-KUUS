const express = require('express')
const router = express.Router()

const user = require('../models/User')

router.use(express.static('views'))


module.exports = router
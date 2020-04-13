const express = require('express');
const { query } = require('express-validator');
const { getStories } = require('../controllers/stories');

const router = express.Router();

router.get('/', [
    query('category')
        .isString()
        .withMessage("category must be a string")
        .custom(async (value) => {
            const allowed = ['health', 'fitness', 'lifestyle', 'diet', 'exercise'];

            if (!allowed.includes(value)) {
                return Promise.reject(`Invalid category: must be one of [${allowed}]`);
            }
        }),
    query('limit')
        .isInt({ max: 100 })
        .withMessage("limit must be a number less than 100")
], getStories);

module.exports = router;

const { validationResult } = require('express-validator');
const { default: axios } = require('axios');
const { NEWS_API } = require('../config/keys');

exports.getStories = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ msg: errors.array()[0].msg });
    }

    const pageSize = req.query.limit || 25;

    axios.get(`https://newsapi.org/v2/everything?q=${req.query.category}&language=en&pageSize=${pageSize}&sortBy=publishedAt&apiKey=${NEWS_API}`)
        .then(data => {
            const articles = data.data.articles.map(article => {
                const { title, description, source, url, urlToImage, publishedAt } = article
                return {
                    title,
                    description,
                    source: source.name,
                    url,
                    urlToImage,
                    publishedAt
                };
            });

            res.json(articles);
        })
        .catch(() => {
            res.status(400).json({ articles: [] })
        });
}
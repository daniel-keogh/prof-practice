const { validationResult } = require('express-validator');
const { default: axios } = require('axios');
const { NEWS_API } = require('../config/keys');

exports.getStories = (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ msg: errors.array()[0].msg });
    }

    const category = 'qInTitle=' + req.query.category || 'fitness';
    const pageSize = 'pageSize=' + req.query.limit || 25;
    const sortBy = 'sortBy=' + req.query.sortBy || 'publishedAt';
    const excludeDomains = 'excludeDomains=' + req.query.excludeDomains || '';
    const apiKey = `apiKey=${NEWS_API}`;

    axios.get(`https://newsapi.org/v2/everything?${category}&${pageSize}&${sortBy}&language=en&${excludeDomains}&${apiKey}`)
        .then(data => {
            // Format the articles array
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

            res.status(200).json(articles);
        })
        .catch(() => {
            res.status(400).json([])
        });
}
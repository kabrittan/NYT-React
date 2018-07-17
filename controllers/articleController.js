const Article = require('../models/Article');

module.exports = {
  create: function(req, res) {
    Article.create(req.body)
      .then(() => res.json('Article Saved'))
      .catch(() => res.send('Article Already Saved'));
  },

  findAll: function(req, res) {
    Article.find({})
      .then(allArticles => res.send(allArticles))
      .catch(err => console.log('13, ERR:', err));
  },

  delete: function(req, res) {
    Article.deleteOne(req.body)
      .then(removedArticle => res.send(removedArticle))
      .catch(err => console.log(err));
  }
};
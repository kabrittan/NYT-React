const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  headline: { type: String, required: true, unique: true },
  web_url: { type: String, required: true },
  snippet: { type: String, required: true },
  pub_date: { type: String, required: true }
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
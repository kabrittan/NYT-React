import axios from 'axios';
require('dotenv').config();

export default {
  // Get articles 
  scrapeArticles: function(searchParams) {
    const { searchTerm, startYear, endYear } = searchParams;

    // Builds the query string
    const fields = '&fl=headline,web_url,pub_date,snippet';

    // Checks which values were submitted by the user 
    const query =
      startYear && endYear
        ? `${searchTerm}&begin_date=${startYear}0101&end_date=${endYear}0101${fields}`
        : startYear && !endYear
          ? `${searchTerm}&begin_date=${startYear}0101${fields}`
          : !startYear && endYear
            ? `${searchTerm}&end_date=${endYear}0101${fields}`
            : searchTerm + fields;

    // Performs the search
    return axios.get(
      'https://api.nytimes.com/svc/search/v2/articlesearch.json' +
        '?api-key=078da0963e154de88d897759e3bc8b29&q=' +
        query
    );
  },

  // Gets saved articles
  getSavedArticles: function() {
    return axios.get('/api/articles/');
  },

  // Saves an article
  saveArticle: function(article) {
    return axios.post('/api/articles', article);
  },

  // Deletes an article
  nukeArticle: function(id) {
    return axios.delete('/api/articles/' + id);
  }
};
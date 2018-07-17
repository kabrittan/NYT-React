import React, { Component } from 'react';
import API from '../utils/API';
import Wrapper from './Wrapper';

class SavedArticles extends Component {
  // Will store all saved articles from the db once the DOM loads
  state = {
    savedArticles: []
  };

  // Gets all articles from the db
  loadArticles = () => {
    return API.getSavedArticles()
      .then(result => this.setState({ savedArticles: result.data }))
      .catch(err => console.log(err));
  };

  // Removes an article. called when the remove article button is pressed
  nukeArticle = event => {
    // Saves the target to use in the .then on a successful delete
    const target = event.target;

    // Makes a copy of the current saved articles before mutating
    const allArticles = this.state.savedArticles.slice();

    // The article _id gets saved on the button for the article. grabs the article id
    const articleToNuke = { _id: target.getAttribute('data-id') };

    return API.nukeArticle(articleToNuke)
      .then(() => {
        // Adds a class to fade out the deleted article
        allArticles[target.getAttribute('data-index')].fade = 'delete-article';

        // Updates state to add the fade class to the deleted article
        this.setState({ savedArticles: allArticles });

        // Removes the deleted article
        allArticles.splice(target.getAttribute('data-index'), 1);

        // Updates state on a successful response from the db with the new articles array
        setTimeout(() => this.setState({ savedArticles: allArticles }), 400);
      })
      .catch(err => console.log(err));
  };

  // Loads all saved articles once the DOM loads
  componentDidMount() {
    return this.loadArticles();
  }

  render() {
    const state = this.state;
    // Const savedArticles = this.state.savedArticles;
    console.log(this.state);
    return (
      <Wrapper
        onClick={this.nukeArticle}
        articles={state.savedArticles}
        btnText="Delete Article"
        page="saved"
      />
    );
  }
}

export default SavedArticles;
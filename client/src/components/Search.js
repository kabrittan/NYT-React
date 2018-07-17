import React, { Component } from 'react';
import { Form } from './Form';
import Wrapper from './Wrapper';
import ColumnOffset from './ColumnOffset';
import API from '../utils/API';
import ReallySmoothScroll from 'really-smooth-scroll';

ReallySmoothScroll.shim();

class Search extends Component {
  state = {
    searchTerm: '',
    searchQuantity: 1,
    startYear: '',
    endYear: '',
    errMsg: '',
    returnedArticles: []
  };

  // Used to store search parameters and updates state
  handleInputChange = event => {
    const { name } = event.target;
    let { value } = event.target;

    // Removes letters from start and end year search
    if (name === 'startYear' || name === 'endYear') {
      if (isNaN(value.slice(-1))) {
        value = value.replace(/[^0-9]+/g, '');
      }
    }

    // Prevents the user from searching a year with more than 4 digits
    if (name === 'startYear' || (name === 'endYear' && value.length > 4)) {
      value = value.slice(0, 4);
    }

    this.setState({
      [name]: value.trim()
    });
  };

  // Searches for articles based on user input
  searchArticles = e => {
    e.preventDefault();
    // Send the current state values to API
    API.scrapeArticles(this.state)
      .then(res => {
        // Update each article to match the Article Schema requirements
        res = res.data.response.docs.map(a => {
          // Grab the main headline
          const headline = a.headline.main;

          // Delete the original headline value
          delete a.headline;

          // Delete the returned score value
          delete a.score;

          // Grab the human readable date
          a.pub_date = a.pub_date.split('T')[0];

          // Create new headline with main headline info only
          a.headline = headline;

          return a;
        });
        // The api result returns 10 articles each time.
        // Slice return the result based on the quantity param
        this.setState({
          searchTerm: '',
          startYear: '',
          endYear: '',
          errMsg: '',
          returnedArticles: res.slice(0, this.state.searchQuantity)
        });

        window.scrollTo(0, 500);
      })
      .catch(() => {
        this.setState({ errMsg: 'No articles found' });
        window.scrollTo(0, 80);
      });
  };

  // Clears the article results
  clearArticles = e => {
    e.preventDefault();
    window.scrollTo(0, 0);
    setTimeout(() => this.setState({ returnedArticles: [] }), 500);
  };

  // Saves an article to the db
  saveArticle = event => {
    // Creates a copy of the current state of returned articles so its values can be mutated
    const allArticles = this.state.returnedArticles.slice();

    // Grabs the article to save based on its index value in the state.returnedArticles array
    const article = allArticles[event.target.getAttribute('data-index')];

    // Article.result is used to indicate a user successfuly saved an article, or if it was already saved.
    API.saveArticle(article)
      .then(res => {
        article.result = res.data;
        this.setState({ returnedArticles: allArticles });
      })
      .catch(() => {
        article.result = 'An error occured while saving the article';
        this.setState({ returnedArticles: allArticles });
      });
  };

  render() {
    const state = this.state;
    console.log('STATE:', this.state);
    return (
      <div>
        <div className="container mb-3">
          <ColumnOffset>
            <Form
              value={this.state}
              onChange={this.handleInputChange}
              onSearch={this.searchArticles}
              onClear={this.clearArticles}
              searchDisable={!state.searchTerm ? true : false}
              clearDisable={!state.returnedArticles.length ? true : false}
            />
          </ColumnOffset>
        </div>
        {!state.errMsg ? (
          <Wrapper
            articles={state.returnedArticles}
            onClick={this.saveArticle}
            btnText="Save Article"
          />
        ) : (
          <h2 className="text-center">{state.errMsg}</h2>
        )}
      </div>
    );
  }
}

export default Search;

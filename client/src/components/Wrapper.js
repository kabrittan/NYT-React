import React from 'react';
import Article from './Article';
import Btn from './Btn';
import ColumnOffset from './ColumnOffset';

const Wrapper = props => (
  <div className="container">
    {props.articles.length ? (
      props.articles.map((a, i) => (
        <ColumnOffset key={a.headline}>
          <Article
            headline={a.headline}
            snippet={a.snippet}
            date={a.pub_date}
            href={a.web_url}
            fade={a.fade ? a.fade : ''}
          >
            {!a.result ? (
              <Btn
                onClick={props.onClick}
                data-index={i}
                className="btn mb-3 btn-secondary"
              >
                {props.btnText}
              </Btn>
            ) : (
              // Renders a response when saving article
              <p
                className={
                  a.result === 'Article Saved' ? 'text-success' : 'text-danger'
                }
              >
                {a.result}
              </p>
            )}
          </Article>
        </ColumnOffset>
      ))
    ) : props.page === 'saved' ? (
      <h2 className="text-center">No Saved Articles</h2>
    ) : null}
  </div>
);

export default Wrapper;
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons";

const backUpQuotes = [
  {
    body:
      "You know you’re in love when you can’t fall asleep because reality is finally better than your dreams.",
    author: "Dr. Suess"
  },
  {
    body:
      "I’m selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can’t handle me at my worst, then you sure as hell don’t deserve me at my best.",
    author: "Marilyn Monroe"
  },
  {
    body:
      "The first step toward success is taken when you refuse to be a captive of the environment in which you first find yourself.",
    author: "Mark Caine"
  }
];
export const QuoteBox = () => {
  const [quote, setQuote] = useState({
    body: "",
    author: ""
  });
  const [quotes, setQuotes] = useState([]);
  const randomQuote = (arr) => {
    const index = Math.floor(Math.random() * arr.length);
    setQuote(arr[index]);
  };

  useEffect(() => {
    fetch("https://cors-anywhere.herokuapp.com/https://favqs.com/api/quotes", {
      headers: {
        Authorization: `Token token="${process.env.REACT_APP_QUOTE_API_KEY}"`
      }
    })
      .then((response) => response.json())
      .then((res) => {
        setQuotes(res.quotes);
        randomQuote(res.quotes);
      })
      .catch((error) => {
        setQuotes(backUpQuotes);
        randomQuote(backUpQuotes);
      });
  }, []);

  return quote && quote.body && quote.body.length > 0 ? (
    <div id="quote-container">
      <div id="quote-box">
        <h2 id="text">"{quote.body}"</h2>
        <h3 id="author">-{quote.author}</h3>
      </div>
      <div id="button-box">
        <a
          id="tweet-quote"
          href={
            `https://twitter.com/intent/tweet?text=` +
            encodeURI(`${quote.body}\n\n-${quote.author}`)
          }
        >
          <FontAwesomeIcon icon={faTwitterSquare} size="lg" color="#00acee" />
          <span id="tweet-text">Tweet quote</span>
        </a>
        <button id="new-quote" onClick={() => randomQuote(quotes)}>
          New quote
        </button>
      </div>
    </div>
  ) : (
    <div id="load-div" className="loading">
      Quotes are loading
    </div>
  );
};

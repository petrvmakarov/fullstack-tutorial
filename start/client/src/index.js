import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from "graphql-tag";
import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import ReactDOM from 'react-dom';
import Pages from './pages';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/',
  headers: {
    authorization: localStorage.getItem('token'),
  },
});

const client = new ApolloClient({
  cache,
  link
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
    cartItems: [],
  },
});

client
  .query({
    query: gql`
      query GetLaunch {
        launch(id: 56) {
          id
          mission {
            name
          }
        }
      }
    `
  })
  .then(result => console.log(result));




// previous variable declarations

ReactDOM.render(
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>, document.getElementById('root')
);
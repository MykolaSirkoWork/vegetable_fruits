import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { App } from './App';
import { AppContextProvider } from './context/AppContext';

const httpLink = createHttpLink({
  uri: 'http://localhost:8080/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('accessToken') || '';

  return {
    headers: {
      ...headers,
      Authorization: token ? JSON.parse(token) : token,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ApolloProvider client={client}>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </ApolloProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

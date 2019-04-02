import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';

// apollo
import { ApolloProvider } from 'react-apollo';
import client from './config-client-apollo';

const store = configureStore();

render(
  <AppContainer>
    <ApolloProvider client={client}>
      <Root store={store} history={history} />
    </ApolloProvider>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./containers/Root').default;
    render(
      <AppContainer>
        <ApolloProvider client={client}>
          <NextRoot store={store} history={history} />
        </ApolloProvider>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}

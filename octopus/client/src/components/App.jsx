import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'


import ProductPage from './ProductPage'


const client = new ApolloClient({ uri: 'http://localhost:8000/graphql' })

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ApolloProvider client={client}>
          <ProductPage />
        </ApolloProvider>
      </div>
    )
  }
}

export default App

import React from 'react';

import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

const GET_PRODUCTS = gql`
  query getProductById {
    product(productId: 1) {
      id
      description
    }
  }
`

class DescComponent extends React.Component {
  render() {
    return (
      <Query query={GET_PRODUCTS}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Loading</div>
          }

          if (error) {
            return <div>Error {error.toString()}</div>
          }

          console.log(data)

          return (
            <div>
              <h1>Description</h1>
              <div key={data.product.id}>
                {data.product.description}
              </div>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default DescComponent

import React from 'react';

import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

const GET_PRODUCTS = gql`
  query getProductById {
    product(productId: 1) {
      id
      price
      quantity
    }
  }
`

class ShoppingComponent extends React.Component {
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
            <div key={data.product.id}>
              
              <p>£{data.product.price}</p>
              <button>Add to cart</button>

              <p>{data.product.quantity}</p>
              <button>-</button>
              <button>+</button>
              
            </div>
          )
        }}
      </Query>
    )
  }
}

export default ShoppingComponent

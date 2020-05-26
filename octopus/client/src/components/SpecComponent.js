import React from 'react';

import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

const GET_PRODUCTS = gql`
  query getProductById {
    product(productId: 1) {
      id
      brand
      weight
      height
      width
      length
      modelCode
      colour
    }
  }
`

class SpecComponent extends React.Component {
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
              <h1>Specifications</h1>
              <ul key={data.product.id}>
                <li>Brand - {data.product.brand}</li>
                <li>Item weight - {data.product.weight}</li>
                <li>Dimensions - {data.product.height}x{data.product.width}</li>
                <li>Item model number - {data.product.modelCode}</li>
                <li>Colour - {data.product.colour}</li>
              </ul>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default SpecComponent

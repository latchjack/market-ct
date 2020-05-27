import React from 'react';

import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

const GET_PRODUCTS = gql`
  query getProductById {
    product(productId: 1) {
      id
      name
      power
      description
      price
      quantity
      brand
      weight
      height
      width
      length
      modelCode
      colour
      imgUrl
    }
  }
`

class ProductPage extends React.Component {
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
              <img src={data.product.imgUrl} alt={data.product.name} />
              <h1>{data.product.name}</h1>
              <p>{data.product.power} / / Packet of {data.product.quantity}</p>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default ProductPage

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
            <div className="product-background-colour">
            <div>
              <p className="company-text-logo"><span className="company-bold-text">octopus</span><span className="company-slim-text">energy</span></p>
              <i className="fas fa-shopping-basket fa-3x"></i>
            </div>
            <div key={data.product.id} className="product-background-colour">
              <img src={data.product.imgUrl} alt={data.product.name} className="product-image" />
              <h1>{data.product.name}</h1>
              <p>{data.product.power} / / Packet of {data.product.quantity}</p>
            </div>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default ProductPage

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
  state = {
    amount: 0,
    basket: 0,
  }

  handleIncrease = () => {
    this.setState({ amount: this.state.amount + 1 })
    console.log(this.state.amount)
  }
  handleDecrease = () => {
    this.setState({ amount: this.state.amount - 1 })
    console.log(this.state.amount)
  }
  handleSubmit = e => {
    this.setState({ basket: this.state.amount })
    console.log('the basket now contains ' + this.state.basket + ' items.')
  }


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
            <div className="whole-page">

              <div className="product-background-colour">

                <div className="header-container">
                  <p className="company-text-logo">
                    <span className="company-bold-text">octopus</span>
                    <span className="company-slim-text">energy</span>
                  </p>
                  <i className="fas fa-shopping-basket fa-3x basket-icon"></i>
                </div>

                <div key={data.product.id} className="product-container">
                  <img src={data.product.imgUrl} alt={data.product.name} className="product-image image is-128x128" />
                  <h1>{data.product.name}</h1>
                  <p className="product-info">{data.product.power} / / Packet of {data.product.quantity}</p>
                </div>

              </div>

              <div key={data.product.id} className="shopping-background-colour shopping-container">
                <h1>£{data.product.price / 100}</h1>
                <button onClick={this.handleSubmit}>Add to cart</button>

                <div className="quantity-container">
                  <button onClick={this.handleDecrease}>-</button>
                  <p>{this.state.amount}</p>
                  <button onClick={this.handleIncrease}>+</button>
                </div>
              </div>

              <div className="desc-background-colour desc-container">
                <h1>Description</h1>
                <div key={data.product.id}>
                  {data.product.description}
                </div>
              </div>


              <div className="spec-background-colour spec-container">
                <h1>Specifications</h1>
                <ul key={data.product.id}>
                  <li>Brand - {data.product.brand}</li>
                  <li>Item weight - {data.product.weight}</li>
                  <li>Dimensions - {data.product.height}x{data.product.width}</li>
                  <li>Item model number - {data.product.modelCode}</li>
                  <li>Colour - {data.product.colour}</li>
                </ul>
              </div>

              <div className="footer-background-colour foot-container">
                <div>
                  Octopus Energy Ltd is a company register in England and Wales.
                  Registered number: 09263424. Registered office: 33 Holborn, London, EC1N 2HT. Trading office: 20-24 Broadwick Street, London, W1F 8HT
                </div>
              </div>

            </div>
          )
        }}
      </Query>
    )
  }
}

export default ProductPage

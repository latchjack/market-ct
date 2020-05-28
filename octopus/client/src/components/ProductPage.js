import React from 'react';

import ImgBasket from '../assets/basket.svg'
import ImgLogo from '../assets/logo.svg'

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
    currentQuantity: 1,
    basket: 0,
  }

  increaseQuantity = () => {
    this.setState({ currentQuantity: this.state.currentQuantity + 1 })
    // console.log(this.state.currentQuantity)
  }
  decreaseQuantity = () => {
    this.setState({ currentQuantity: this.state.currentQuantity - 1 })
    // console.log(this.state.currentQuantity)
  }
  handleSubmit = e => {
    this.setState({ basket: this.state.basket + this.state.currentQuantity })
    // console.log('the basket now contains ' + this.state.basket.value + ' items.')
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

          // console.log(data)

          return (
            <div className="whole-page column is-full-desktop is-one-third-tablet is-full-mobile">

              <div className="merging-colour">

                <div className="header-container">
                  <p className="company-text-logo">
                    <img src={ImgLogo} alt="octopus text logo" width="200px" />
                    {/* <span className="company-bold-text">octopus</span> */}
                    {/* <span className="company-slim-text">energy</span> */}
                  </p>
                  <div className="basketArea">
                    <div className="innerBasketArea">
                      <p className="basketNumber">{this.state.basket}</p>
                      <img src={ImgBasket} alt="shopping basket" height="50px"/>
                    </div>
                  </div>
                </div>

                  <div key={data.product.id} className="product-container ">
                    <div className="card">
                      <div className="card-content is-flex is-horizontal-center">
                        <img src={data.product.imgUrl} alt={data.product.name} className="image is-4by5 product-image" />
                      </div>
                    </div>
                    <div className="name-and-info">
                      <h1>{data.product.name}</h1>
                      <p className="product-info">{data.product.power} / / Packet of {data.product.quantity}</p>
                    </div>
                  </div>

              </div> {/*end of merging colour div*/}

              <div className="page-container">

                  <div  className="dark-background-colour shopping-container">
                    <div className="price-and-counter">
                      <h1>£{data.product.price / 100}</h1>
                      <div className="quantity-container">
                        <button onClick={this.decreaseQuantity} className="counter-buttons decrease-btn">-</button>
                        <p className="counter">{this.state.currentQuantity}</p>
                        <button onClick={this.increaseQuantity} className="counter-buttons increase-btn">+</button>
                      </div>
                    </div>
                    <button onClick={this.handleSubmit} className="cart-button">Add to cart</button>
                  </div>

                  <div className="light-background-colour desc-container">
                    <h1>Description</h1>
                    <div key={data.product.id}>
                      <p>{data.product.description}</p>
                    </div>
                  </div>

                  <div className="dark-background-colour spec-container">
                    <h1>Specifications</h1>
                    <ul key={data.product.id}>
                      <li>Brand | <span className="spec-data">{data.product.brand}</span></li>
                      <li>Item weight | <span className="spec-data">{data.product.weight}</span></li>
                      <li>Dimensions | <span className="spec-data">{data.product.height}x{data.product.length}x{data.product.width}</span></li>
                      <li>Item model number | <span className="spec-data">{data.product.modelCode}</span></li>
                      <li>Colour | <span className="spec-data">{data.product.colour}</span></li>
                    </ul>
                  </div>




              </div> {/*end of page-container div*/}

              <div className="light-background-colour">
                <div className="foot-container">
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

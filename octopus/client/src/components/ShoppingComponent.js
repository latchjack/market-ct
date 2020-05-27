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

          // console.log(data)

          return (
            <div key={data.product.id}>
              
              <p>£{data.product.price / 100}</p>
              <button onClick={this.handleSubmit}>Add to cart</button>

          <p>{this.state.amount}</p>
              <button onClick={this.handleDecrease}>-</button>
              <button onClick={this.handleIncrease}>+</button>
              
            </div>
          )
        }}
      </Query>
    )
  }
}

export default ShoppingComponent

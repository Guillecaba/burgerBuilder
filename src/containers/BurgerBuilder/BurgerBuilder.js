import React, { Component } from "react";
import { connect } from 'react-redux';

import Auxi from "../../hoc/Auxi/Auxi";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../store/actions/index';



class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    console.log(this.props);
    this.props.onInitIngredients();
    
    /* */
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0 ;
  }

  purchasingHandler = () => {
    this.setState({ purchasing: true });
  };

  purchasingCancelledHandler = () => {
    this.setState({ purchasing: false });
  };

  purchasingContinueHandler = () => {
      this.props.onInitPurchase();
      const queryParams = [];
      for (let i in this.state.ingredients) {
        queryParams.push(encodeURIComponent(i)+"="+encodeURIComponent(this.state.ingredients[i]))
      }
      queryParams.push('price=' + this.props.price);
      const queryString = queryParams.join('&');
      this.props.history.push({
        pathname:'/checkout',
        search: '?' + queryString
      });
  };

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.props.error ? <p>Los ingredientes no pueden ser cargados!</p>:<Spinner />

    if ( this.props.ings ) {
      burger =  (
        <Auxi>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemove}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            price={this.props.price}
            purchasing={this.state.purchasing}
            ordered={this.purchasingHandler}
          />
        </Auxi>
      )
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancelled={this.purchasingCancelledHandler}
          purchaseContinue={this.purchasingContinueHandler}
          totalPrice={this.props.price}
        />
      );
    }

    return (
      <Auxi>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchasingCancelledHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
        
      </Auxi>
    );
  }
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
	}
}

const mapDispatchToProps =  dispatch => {
	return {
		onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemove: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));

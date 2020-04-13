import React, { Component } from "react";
import { connect } from 'react-redux';

import Auxi from "../../hoc/Auxi/Auxi";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from "../../axios-orders";
import * as burgerBuilderActions from '../../store/actions/index';



class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error:false
  };

  componentDidMount() {
    console.log(this.props);
    
    /* axios.get('https://my-burger-73194.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ingredients:response.data});
      })
      .catch(error => {
        this.setState({error:true})
      }) */
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
    /* this.setState({loading:true})
    //alert('Podes Continuar!');
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Guillermo Caballero",
        address: {
          street: "Test Street 1",
          zipCode: "423698",
          country: "Guillermo"
        },
        email: "guillermo@gmail.com"
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({loading:false, purchasing:false});
      })
      .catch(error => {
        this.setState({loading:false, purchasing:false});
      }); */

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

/*   addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchasableState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchasableState(updatedIngredients);
  }; */
  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>Los ingredientes no pueden ser cargados!</p>:<Spinner />

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

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    // {luchuga:true,bacon:false,..}
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
		ings: state.ingredients,
		price: state.totalPrice
	}
}

const mapDispatchToProps =  dispatch => {
	return {
		onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
		onIngredientRemove: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));

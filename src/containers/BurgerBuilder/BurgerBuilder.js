import React, { Component } from "react";

import Auxi from "../../hoc/Auxi/Auxi";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from "../../axios-orders";

const INGREDIENT_PRICES = {
  lechuga: 0.5,
  queso: 0.4,
  carne: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error:false
  };

  componentDidMount() {
    console.log(this.props);
    
    axios.get('https://my-burger-73194.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ingredients:response.data});
      })
      .catch(error => {
        this.setState({error:true})
      })
  }

  updatePurchasableState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
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
      queryParams.push('price=' + this.state.totalPrice);
      const queryString = queryParams.join('&');
      this.props.history.push({
        pathname:'/checkout',
        search: '?' + queryString
      });
  };

  addIngredientHandler = type => {
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
  };
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>Los ingredientes no pueden ser cargados!</p>:<Spinner />

    if ( this.state.ingredients ) {
      burger =  (
        <Auxi>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            purchasing={this.state.purchasing}
            ordered={this.purchasingHandler}
          />
        </Auxi>
      )
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancelled={this.purchasingCancelledHandler}
          purchaseContinue={this.purchasingContinueHandler}
          totalPrice={this.state.totalPrice}
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

export default withErrorHandler( BurgerBuilder, axios );

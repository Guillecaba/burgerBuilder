import React, { Component } from "react";

import Auxi from "../../../hoc/Auxi/Auxi";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
    // This could be a functional component
  componentDidUpdate() {
    console.log("[OrderSummary] DidUpdate");
  }
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
          {this.props.ingredients[igKey]}
        </li>
      );
    });
    return (
      <Auxi>
        <h3>Tu pedido</h3>
        <p>Una deliciosa hamburguesa con los siguientes ingredientes: </p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Precio Total:{this.props.totalPrice.toFixed(2)}</strong>
        </p>
        <p>Continuar con el pedido?</p>
        <Button btnType="Danger" clicked={this.props.comprandoCancelado}>
          CANCELAR
        </Button>
        <Button btnType="Success" clicked={this.props.comprandoContinuar}>
          CONTINUAR
        </Button>
      </Auxi>
    );
  }
}

export default OrderSummary;

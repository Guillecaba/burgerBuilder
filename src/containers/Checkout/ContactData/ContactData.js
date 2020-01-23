import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from  './ContactData.css'
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {
    state = {
        orderForm: {
          name:{
            elementType:'input',
            elementConfig:{
              type:'text',
              placeholder:'Mi nombre'
            },
            value:''
          },
          street: {
            elementType:'input',
            elementConfig:{
              type:'text',
              placeholder:'Mi calle'
            },
            value:''
          },
          zipCode: {
            elementType:'input',
            elementConfig:{
              type:'text',
              placeholder:'Codigo Postal'
            },
            value:''
          },
          country:{
            elementType:'input',
            elementConfig:{
              type:'text',
              placeholder:'Pais'
            },
            value:''
          },
          email: {
            elementType:'input',
            elementConfig:{
              type:'email',
              placeholder:'Tu email'
            },
            value:''
          },
          deliveryMethod: {
            elementType:'select',
            elementConfig:{
              options:[{value:'fastest',displayValue:'Fastest'},
                        {value:'cheapest',display:'Cheapest'}]
            },
            value:''
          }
        }, 
        loading:false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading:true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            
          };
          axios
            .post("/orders.json", order)
            .then(response => {
              this.setState({loading:false});
              this.props.history.push('/')
            })
            .catch(error => {
              this.setState({loading:false});
            }); 
        
    }

    render() {

        let form = (
            <form>
                <Input elementType="..." elementConfig="..." value="..." />
                <Input inputtype="input" type="email" name="email" placeholder="Tu email" />
                <Input inputtype="input" type="text" name="street" placeholder="Calle" />
                <Input inputtype="input" type="text" name="postal" placeholder="Codigo postal" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;
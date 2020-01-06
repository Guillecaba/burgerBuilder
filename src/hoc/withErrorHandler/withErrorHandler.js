import React, { Component } from "react";

import Modal from '../../components/UI/Modal/Modal';
import Auxi from '../Auxi/Auxi';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error:null
    }

    constructor() {
      super();
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error:null});
        return req
      })
      this.resIncerceptor = axios.interceptors.response.use(res => res,error => {
        this.setState({error:error})

      })
    }

    componentWillUnmount() {
      console.log('[withErrorHandler]: componentWillUnmount()')
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resIncerceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({error:null});
    }

    render(){
      return (
        <Auxi>
          <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message: null}
          </Modal>
          <WrappedComponent {...this.props} />
      </Auxi>
      )
    }
  }
}

export default withErrorHandler;
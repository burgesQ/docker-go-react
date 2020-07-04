import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default class App extends Component {

  constructor(props) {
    super(props);

    if (process.env.NODE_ENV !== 'production') {
      require('dotenv').config();
    }

    this.state = {
      version: 'undef',
      apiHost: process.env.API_HOST || '',
      isLoading: false,
    };
  }


  notifyError(msg) {
    toast.error(msg, {
      containerId: 'Err',
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }


  async componentDidMount() {
    this.loadVersion();
  }

  async loadVersion() {
    this.setState({ isLoading: true });

    try {
      const content = await axios.get(this.state.apiHost + '/api/v1/version');
      this.setState({
        version: content.data.content,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        isLoading: false,
      });
      this.notifyError("While loading templates name: " + error);
    }
  }

  render() {

    return (

      <div className="App">

        <div>
          <ToastContainer enableMultiContainer containerId={'Err'}/>
        </div>

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <p>
            Version is {this.state.isLoading ? 'loading ...' : this.state.version} - host is {this.state.apiHost}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
};

import React, { Component } from "react";
import APIManager from "../../modules/apimanager";
import { Link, Route, withRouter, Redirect} from "react-router-dom";

export default class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    users: [],
    userId: ""
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  handleLogin = () => {
    this.state.users.map(user => {
      if (
        user.username === this.state.username &&
        user.password === this.state.password
      ) {
        console.log("here");
        let credentials = {
          username: this.state.username,
          password: this.state.password,
          userId: user.id
        };
        this.props.setUser(credentials);
        this.props.history.push("/");
      } else {
        // alert("You need to register")
        this.props.history.push("/login/register-form");
      }
    });
  };

  getData = e => {
    APIManager.getAll("users").then(users => {
      this.setState({
        users: users
      });
    });
  };

  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <form>
      <div className="box">
        <fieldset className="bod">
          <h3 className="loginHeader">Join your coven:</h3>
          <div className="formgrid">
            <input className="username"
              onChange={this.handleFieldChange}
              type="text"
              id="username"
              placeholder="Username"
              required=""
              autoFocus=""
            />
            <label htmlFor="inputUsername"></label>

            <input className="password"
              onChange={this.handleFieldChange}
              type="password"
              id="password"
              placeholder="Password"
              required=""
            />
            <label htmlFor="inputPassword"></label>
            <button type="button" className="signIn" onClick={this.handleLogin}>
              Login
            </button>
          </div>
        </fieldset>
        </div>
      </form>
    );
  }
}

import {Component} from 'react'
import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMessage: '',
    showErrorMessage: false,
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetailsObject = {username, password}

    const onLoginSuccess = jwtTokenValue => {
      const jwtToken = jwtTokenValue

      Cookies.set('jwt_token', jwtToken, {expires: 30})
    }

    const onLoginFail = errorMessage => {
      this.setState({showErrorMessage: true, errorMessage})
    }

    const loginApi = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetailsObject),
    }

    const response = await fetch(loginApi, options)
    const data = await response.json()

    if (response.ok === true) {
      onLoginSuccess(data.jwt_token)
      const {history} = this.props
      history.replace('/')
    } else {
      onLoginFail(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUserLoginForm = () => {
    const {username, showErrorMessage, errorMessage} = this.state

    return (
      <div>
        <form className="form-el" onSubmit={this.onSubmitLoginForm}>
          <label htmlFor="username" className="label-el">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            className="input-el"
            onChange={this.onChangeUsername}
          />
          <label htmlFor="password" className="label-el">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            className="input-el"
            onChange={this.onChangePassword}
          />
          <button type="submit" className="login-btn">
            LOGIN
          </button>
          {showErrorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-route-container">
        <div className="login-container">
          <img
            src="https://res.cloudinary.com/dqhiauk0o/image/upload/v1710321487/spotifyLogo_dyyodh.png"
            alt="login website logo"
          />

          <h1 className="login-website-heading">Spotify Remix</h1>
          {this.renderUserLoginForm()}
        </div>
      </div>
    )
  }
}

export default Login

import {Component} from 'react'

import './index.css'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import {RiLogoutCircleRLine} from 'react-icons/ri'
import {IoMenuSharp, IoCloseSharp} from 'react-icons/io5'
import {FaPlayCircle} from 'react-icons/fa'

class Header extends Component {
  state = {showLogoutButton: false}

  onClickLogoutButton = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onCLickMenuIconMobile = () => {
    this.setState(prevState => ({
      showLogoutButton: !prevState.showLogoutButton,
    }))
  }

  render() {
    const {showLogoutButton} = this.state

    return (
      <div className="header">
        <nav className="nav-bar">
          <Link to="/" className="link">
            <img
              src="https://res.cloudinary.com/dqhiauk0o/image/upload/v1710321487/spotifyLogo_dyyodh.png"
              alt="website logo"
              className="header-website-logo"
            />
          </Link>
          <button
            type="button"
            className="logout-button-desktop"
            onClick={this.onClickLogoutButton}
          >
            <RiLogoutCircleRLine alt="logout" className="logout-icon" />
            Logout
          </button>
          <div className="mobile">
            <button
              type="button"
              onClick={this.onCLickMenuIconMobile}
              className="menu-button"
            >
              {showLogoutButton ? (
                <IoCloseSharp alt="menu" className="menu-icon-mob" />
              ) : (
                <IoMenuSharp alt="menu" className="menu-icon-mob" />
              )}
            </button>
            {showLogoutButton && (
              <button type="button" onClick={this.onClickLogoutButton}>
                Logout
              </button>
            )}
          </div>
        </nav>
      </div>
    )
  }
}

export default withRouter(Header)

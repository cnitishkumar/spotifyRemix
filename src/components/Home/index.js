import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import EditorsPicksAlbums from '../EditorsPicksAlbums'
import GenersAndMoodsAlbums from '../GenersAndMoodsAlbums'
import NewReleasesAlbums from '../NewReleasesAlbums'

import './index.css'

class Home extends Component {
  render() {
    return (
      <>
        <div className="home-component-container">
          <Header />
          <div className="home-container">
            <EditorsPicksAlbums />
            <GenersAndMoodsAlbums />
            <NewReleasesAlbums />
          </div>
        </div>
      </>
    )
  }
}

export default Home

import {Component} from 'react'
import Cookies from 'js-cookie'
import GenersAndMoodsAlbumItem from '../GenersAndMoodsAlbumItem'
import Loader from '../Loader'
import FailureView from '../FailureView'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class GenersAndMoodsAlbums extends Component {
  state = {apiStatus: apiStatusConstants.initial, albumsData: []}

  componentDidMount() {
    this.fetchAlbumsData()
  }

  fetchAlbumsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const formatData = data => ({
      albumName: data.name,
      albumId: data.id,
      href: data.href,
      albumImageUrl: data.icons[0].url,
    })

    const apiUrl = 'https://apis2.ccbp.in/spotify-clone/categories'

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()

      const formattedData = data.categories.items.map(each => formatData(each))

      this.setState({
        apiStatus: apiStatusConstants.success,
        albumsData: formattedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderAlbumsData = () => {
    const {albumsData} = this.state

    return (
      <nav>
        <ul className="genre-list-ul-el">
          {albumsData.map(each => (
            <GenersAndMoodsAlbumItem albumDetails={each} key={each.albumId} />
          ))}
        </ul>
      </nav>
    )
  }

  renderGeners = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAlbumsData()
      case apiStatusConstants.inProgress:
        return <Loader />
      case apiStatusConstants.failure:
        return <FailureView fetchAlbumsData={this.fetchAlbumsData} />
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <h1 className="genre-heading">Genres & Moods</h1>
        {this.renderGeners()}
      </div>
    )
  }
}

export default GenersAndMoodsAlbums

import {Component} from 'react'
import Cookies from 'js-cookie'
import EditorsPicksAlbumItem from '../EditorsPicksAlbumItem'
import Loader from '../Loader'

import FailureView from '../FailureView'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class EditorsPicksAlbums extends Component {
  state = {apiStatus: apiStatusConstants.initial, playListData: []}

  componentDidMount() {
    this.fetchAlbumsData()
  }

  fetchAlbumsData = async () => {
    this.setState({apiStatus: 'INPROGRESS'})
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis2.ccbp.in/spotify-clone/featured-playlists'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    const formatData = data => ({
      collaborative: data.collaborative,
      description: data.description,
      externalUrls: data.external_urls,
      href: data.href,
      id: data.id,
      imageUrl: data.images[0].url,
      name: data.name,
    })

    if (response.ok === true) {
      const playListData = await response.json()

      const formattedData = playListData.playlists.items.map(each =>
        formatData(each),
      )
      this.setState({
        playListData: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderPlayListItems = () => {
    const {playListData} = this.state

    return (
      <nav>
        <ul className="featured-play-list-ul-el">
          {playListData.map(each => (
            <EditorsPicksAlbumItem playListItemDetails={each} key={each.id} />
          ))}
        </ul>
      </nav>
    )
  }

  renderEditorsPicks = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPlayListItems()
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
      <div className="content-container">
        <h1 className="editors-picks-heading">Editors Picks</h1>
        {this.renderEditorsPicks()}
      </div>
    )
  }
}

export default EditorsPicksAlbums

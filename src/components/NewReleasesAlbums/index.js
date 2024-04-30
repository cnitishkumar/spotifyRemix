import {Component} from 'react'
import Cookies from 'js-cookie'
import NewReleasesAlbumItem from '../NewReleasesAlbumItem'
import Loader from '../Loader'
import FailureView from '../FailureView'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class NewReleasesAlbums extends Component {
  state = {apiStatus: apiStatusConstants.initial, albumsData: []}

  componentDidMount() {
    this.fetchAlbumsData()
  }

  fetchAlbumsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = `https://apis2.ccbp.in/spotify-clone/new-releases`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      header: {
        authorization: `bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    const formatData = data => ({
      albumType: data.album_type,
      artists: data.artists[0].name,
      albumName: data.name,
      type: data.type,
      id: data.id,
      albumImageUrl: data.images[0].url,
    })

    if (response.ok === true) {
      const albumsData = await response.json()

      const formattedData = albumsData.albums.items.map(each =>
        formatData(each),
      )

      this.setState({
        albumsData: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderNewReleasesData = () => {
    const {albumsData} = this.state

    return (
      <nav>
        <ul className="new-releases-ul-el">
          {albumsData.map(each => (
            <NewReleasesAlbumItem albumData={each} key={each.id} />
          ))}
        </ul>
      </nav>
    )
  }

  renderNewReleases = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderNewReleasesData()
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
      <div className="new-releases">
        <h1 className="new-releases-heading">New Releases</h1>
        {this.renderNewReleases()}
      </div>
    )
  }
}

export default NewReleasesAlbums

import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from '../Loader'
import PlayerController from '../PlayerController'
import FailureView from '../FailureView'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class NewReleaseSpecificAlbumPlayList extends Component {
  state = {
    songsPlayList: [],

    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchAlbumsData()
  }

  fetchAlbumsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis2.ccbp.in/spotify-clone/album-details/${id}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      header: {
        Authorization: `bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const getArtistList = artistData => {
      const list = []

      artistData.map(each => list.push(each.name))

      return list
    }

    const formatData = (data, popularity, albumImageUrlsList, addedAt) => ({
      previewUrl: data.preview_url,
      artist: getArtistList(data.artists),
      id: data.id,
      albumImageUrlsList,
      name: data.name,
      popularity,
      durationInMs: data.duration_ms,
      album: data.name,
      addedAt,
    })

    const response = await fetch(apiUrl, options)

    const data = await response.json()

    if (response.ok === true) {
      const formattedData = data.tracks.items.map(each =>
        formatData(each, data.popularity, data.images, data.release_date),
      )

      this.setState({
        apiStatus: apiStatusConstants.success,
        songsPlayList: formattedData,
        playListDetails: {
          playListName: data.name,
          playListImageUrl: data.images[0].url,
          playListDescription: data.description,
        },
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderNewReleases = () => {
    const {apiStatus, songsPlayList, playListDetails} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return (
          <PlayerController
            songsPlayList={songsPlayList}
            playListDetails={playListDetails}
            category="New Releases"
          />
        )
      case apiStatusConstants.inProgress:
        return <Loader />
      case apiStatusConstants.failure:
        return <FailureView fetchAlbumsData={this.fetchAlbumsData} />

      default:
        return null
    }
  }

  render() {
    return this.renderNewReleases()
  }
}

export default NewReleaseSpecificAlbumPlayList

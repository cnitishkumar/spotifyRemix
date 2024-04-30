import {Component} from 'react'
import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'
import BackNavigation from '../BackNavigation'
import Loader from '../Loader'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class GenersAndMoodsSpecificAlbumPlayList extends Component {
  state = {albumData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getPlayListData()
  }

  getPlayListData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis2.ccbp.in/spotify-clone/category-playlists/${id}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      header: {
        authorization: `bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    const genresData = await response.json()

    const formatData = data => ({
      id: data.id,
      albumName: data.name,
      type: data.type,
      albumImageUrl: data.images[0].url,
      totalTracks: data.tracks.total,
      description: data.description,
    })

    if (response.ok === true) {
      const filteredData = genresData.playlists.items.filter(
        each => each !== null,
      )

      console.log(genresData.playlists.items)

      const formattedData = filteredData.map(each => formatData(each))

      this.setState({
        apiStatus: apiStatusConstants.success,
        albumData: formattedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderGeners = () => {
    const {albumData} = this.state

    const AlbumItem = props => {
      const {albumDetails} = props
      const {
        id,
        albumName,
        totalTracks,
        type,
        albumImageUrl,
        description,
      } = albumDetails

      return (
        <li className="album-list">
          <div className="genere-album-container">
            <Link to={`playlist/${id}`} className="playlist-link">
              <img
                src={albumImageUrl}
                alt="albumimage"
                className="geners-album-image"
              />
            </Link>

            <div className="album-name-tracks-container">
              <p className="genere-album-name">{albumName}</p>
              <p className="total-tracks">{totalTracks} Tracks</p>
            </div>
          </div>
        </li>
      )
    }

    return (
      <>
        <h1 className="genere-type">
          {albumData[0].type[0].toUpperCase() + albumData[0].type.slice(1)}
        </h1>
        <ul className="generes-album-ul-el">
          {albumData.map(each => (
            <AlbumItem albumDetails={each} key={each.id} />
          ))}
        </ul>
      </>
    )
  }

  renderData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderGeners()
      case apiStatusConstants.inProgress:
        return <Loader />
      case apiStatusConstants.failure:
        return <FailureView />
      default:
        return null
    }
  }

  render() {
    const {albumData, apiStatus} = this.state

    return (
      <div className="geners-component">
        <BackNavigation />
        {this.renderData()}
      </div>
    )
  }
}

export default GenersAndMoodsSpecificAlbumPlayList

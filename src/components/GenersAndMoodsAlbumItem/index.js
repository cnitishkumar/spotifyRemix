import {Link} from 'react-router-dom'
import './index.css'

const GenersAndMoodsAlbumItem = props => {
  const {albumDetails} = props
  const {albumName, albumId, albumImageUrl} = albumDetails

  return (
    <li className="genre-album-list-item">
      <Link to={`/category/${albumId}/playlists`} className="genre-link">
        <img src={albumImageUrl} alt="category" className="genre-album-image" />
        <p className="album-name">{albumName}</p>
      </Link>
    </li>
  )
}

export default GenersAndMoodsAlbumItem

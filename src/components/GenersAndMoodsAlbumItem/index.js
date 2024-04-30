import {Link} from 'react-router-dom'
import './index.css'

const GenersAndMoodsAlbumItem = props => {
  const {albumDetails} = props
  const {albumName, albumId, albumImageUrl} = albumDetails

  return (
    <li className="geners-album-list-item">
      <Link to={`/category/${albumId}/playlists`} className="genere-link">
        <img src={albumImageUrl} alt="category" className="gener-album-image" />
      </Link>
    </li>
  )
}

export default GenersAndMoodsAlbumItem

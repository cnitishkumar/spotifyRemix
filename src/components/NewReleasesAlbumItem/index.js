import {Link} from 'react-router-dom'
import './index.css'

const NewReleasesAlbumItem = props => {
  const {albumData} = props

  const {id, albumName, albumImageUrl} = albumData

  return (
    <li className="new-release-album-list-item">
      <Link to={`/album/${id}`} className="new-releases-link">
        <img
          src={albumImageUrl}
          alt="new release album"
          className="new-release-album-image"
        />
        <p className="new-release-album-name">{albumName}</p>
      </Link>
    </li>
  )
}

export default NewReleasesAlbumItem

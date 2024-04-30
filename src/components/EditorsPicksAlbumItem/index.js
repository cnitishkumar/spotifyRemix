import {Link} from 'react-router-dom'
import './index.css'

const EditorsPicksAlbumItem = props => {
  const {playListItemDetails} = props
  const {name, imageUrl, id} = playListItemDetails

  return (
    <li className="play-list-item">
      <div className="play-list-item-container">
        <Link to={`playlist/${id}`} className="playlist-link">
          <img
            src={imageUrl}
            alt="featured playlist"
            className="playlist-image"
          />
        </Link>
        <p className="play-list-name">{name}</p>
      </div>
    </li>
  )
}

export default EditorsPicksAlbumItem

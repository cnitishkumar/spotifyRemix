import moment from 'moment'

import './index.css'

const EditorsPicksPlayListItem = props => {
  const {
    playlistDetails,
    onClickPlayListItem,
    isActive,
    songsPlayList,
    id,
    width,
  } = props
  const {
    addedAt,
    album,
    albumImageUrl,
    artist,
    durationInMs,
    name,
  } = playlistDetails

  const onClickListItem = async () => {
    const index = songsPlayList.indexOf(playlistDetails)
    onClickPlayListItem(index)
  }

  const playListClassName = isActive
    ? 'play-list-container  active-class'
    : 'play-list-container'

  const mobilePlayListClassName = isActive
    ? 'active-class mobile-li-el'
    : 'mobile-li-el'
  const added = moment(addedAt, 'YYYYMMDD').fromNow()

  const formatSongDuration = inMilliSecs => {
    const inSecs = moment.duration(inMilliSecs).seconds()
    const inMins = moment.duration(inMilliSecs).minutes()

    if (inSecs < 10) {
      return `${inMins}:0${inSecs}`
    }
    return `${inMins}:${inSecs}`
  }

  const desktopPlayList = (
    <li className="li-el" onClick={onClickListItem}>
      <div className={playListClassName}>
        <span className="track-num">
          {songsPlayList.indexOf(playlistDetails) + 1}
        </span>

        <span className="play-list-song-item">{name}</span>
        <span className="play-list-song-item">{album}</span>
        <span className="play-list-song-item">
          {formatSongDuration(durationInMs)}
        </span>
        <span className="play-list-song-item">{artist}</span>
        <span className="play-list-song-item">{added}</span>
      </div>
    </li>
  )
  const mobilePlayListView = (
    <li className={mobilePlayListClassName} onClick={onClickListItem}>
      <div>
        <p className="mobile-track-name">{name}</p>
        <p className="mobile-artist-name">{artist}</p>
      </div>
      <p className="mobile-duration">{formatSongDuration(durationInMs)}</p>
    </li>
  )
  const playListView = width > 576 ? desktopPlayList : mobilePlayListView

  return playListView
}

export default EditorsPicksPlayListItem

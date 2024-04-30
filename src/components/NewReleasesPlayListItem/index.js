import moment from 'moment'

import './index.css'

const NewReleasesPlayListItem = props => {
  const {
    playlistDetails,
    onClickPlayListItem,
    isActive,
    songsPlayList,
    id,
    width,
  } = props
  const {addedAt, popularity, durationInMs, name, artist} = playlistDetails

  const onClickListItem = async () => {
    const index = songsPlayList.indexOf(playlistDetails)
    onClickPlayListItem(index)
  }

  const playListClassName = isActive
    ? 'new-relase-playlist-item active-class'
    : 'new-relase-playlist-item '

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

  const mobilePlayListView = (
    <li className={mobilePlayListClassName} onClick={onClickListItem}>
      <div>
        <p className="mobile-track-name">{name}</p>
        <p className="mobile-artist-name">{artist}</p>
      </div>
      <p className="mobile-duration">{formatSongDuration(durationInMs)}</p>
    </li>
  )

  const desktopPlayListView = (
    <li className="li-el" onClick={onClickListItem}>
      <div className={playListClassName}>
        <span className="new-release-track-num">
          {songsPlayList.indexOf(playlistDetails) + 1}
        </span>
        <span className="new-relase-playlist-item">{name}</span>
        <span className="new-relase-playlist-item">
          {formatSongDuration(durationInMs)}
        </span>
        <div className="new-relase-playlist-item">
          <span> {'|'.repeat(popularity / 10)}</span>
          <span className="total-popularity">
            {' '}
            {'|'.repeat(10 - popularity / 10)}
          </span>
          <span className="new-relase-playlist-item">{artist}</span>
        </div>
      </div>
    </li>
  )

  const playListView = width > 576 ? desktopPlayListView : mobilePlayListView

  return playListView
}

export default NewReleasesPlayListItem

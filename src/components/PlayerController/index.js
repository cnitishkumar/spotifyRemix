import React, {Component} from 'react'
import {FaPlayCircle, FaPauseCircle, FaVolumeUp} from 'react-icons/fa'

import EditorsPicksPlayListItem from '../EditorsPicksPlayListItem'
import NewReleasesPlayListItem from '../NewReleasesPlayListItem'

import Header from '../Header'

import BackNavigation from '../BackNavigation'

import './index.css'

class PlayerController extends Component {
  state = {
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    currentIndex: 0,
    playList: {...this.props}.songsPlayList,
    playListDetails: {...this.props}.playListDetails,
    volume: 0.5,
    width: window.innerWidth,
  }

  audioRef = React.createRef()

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
    this.audioRef.current.addEventListener('loadeddata', this.handleLoadedData)
    this.audioRef.current.addEventListener('ended', this.handleSongEnded)

    this.intervalId = setInterval(() => {
      if (this.audioRef.current.currentTime) {
        this.setState({currentTime: this.audioRef.current.currentTime})
      }
    }, 1000)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
    this.audioRef.current.removeEventListener(
      'loadeddata',
      this.handleLoadedData,
    )
    this.audioRef.current.removeEventListener('ended', this.handleSongEnded)

    clearInterval(this.intervalId)
  }

  handleResize = () => {
    this.setState({width: window.innerWidth})
  }

  handleLoadedData = () => {
    this.setState({duration: this.audioRef.current.duration})
  }

  togglePlay = () => {
    const audio = this.audioRef.current
    const {isPlaying} = this.state
    if (isPlaying) {
      audio.pause()
    } else {
      this.audioRef.current.play()
    }
    this.setState({isPlaying: !isPlaying})
  }

  handleProgressChange = event => {
    this.audioRef.current.currentTime = event.target.value
    this.setState({currentTime: this.audioRef.current.currentTime})
  }

  handleVolumeChange = event => {
    this.audioRef.current.volume = event.target.value
    this.setState({volume: event.target.value})
  }

  handleSongEnded = () => {
    const {songsPlayList} = this.props
    const {currentIndex} = this.state

    const playlistLength = songsPlayList.length
    let newIndex = currentIndex + 1

    newIndex = (newIndex + 1) % playlistLength

    this.setState({currentIndex: newIndex}, () => {
      this.audioRef.current.load()
      this.audioRef.current.play() // Automatically play the next song
    })
  }

  formatTime = ms => {
    const secs = ms % 10000

    if (secs < 10) {
      return `00:0${parseInt(secs, 10)}`
    }

    return `00:${parseInt(secs, 10)}`
  }

  renderPlayer = () => {
    const {songsPlayList} = this.props
    const {
      isPlaying,
      currentTime,
      duration,
      currentIndex,
      volume,
      playList,
      width,
    } = this.state

    const {albumImageUrlsList, album, artist} = playList[currentIndex]

    return (
      <>
        <div className="audio-player">
          <audio ref={this.audioRef}>
            <source
              src={songsPlayList[currentIndex].previewUrl}
              type="audio/mp3"
            />
            <track kind="captions" srcLang="en" />
          </audio>
          <div className="footer-display-container">
            <img
              src={albumImageUrlsList[2].url}
              className="footer-display-image"
              alt="footerImage"
            />
            <div className="footer-display-details">
              <p className="footer-album-name">{album}</p>
              <p className="footer-artist-name">{artist[0]}</p>
            </div>
          </div>
          <div className="controls">
            <button
              type="button"
              onClick={this.togglePlay}
              className="play-pause-btn"
            >
              {isPlaying ? (
                <FaPauseCircle className="play-pause-icon" />
              ) : (
                <FaPlayCircle className="play-pause-icon" />
              )}
            </button>
          </div>
          {width > 576 && (
            <>
              <span className="song-duration">
                {this.formatTime(currentTime)} / {this.formatTime(duration)}
              </span>

              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={this.handleProgressChange}
                className="progress-bar"
              />
              <div className="volume-container">
                <FaVolumeUp className="volume-icon" />

                <input
                  type="range"
                  min={0}
                  max={1}
                  value={volume}
                  step={0.1}
                  onChange={this.handleVolumeChange}
                />
              </div>
            </>
          )}
        </div>
        <hr className="hr-bottom" />
      </>
    )
  }

  onClickPlayListItem = async index => {
    this.setState({currentIndex: index, isPlaying: true})

    await this.audioRef.current.load()
    this.audioRef.current.play()
  }

  renderPlayList = () => {
    const {category} = this.props
    const {playList, currentIndex, width, playListDetails} = this.state

    const ActiveCategory =
      category === "Editor's picks"
        ? EditorsPicksPlayListItem
        : NewReleasesPlayListItem

    const playListHeader =
      category === "Editor's picks" ? (
        <div className="play-list-container-header">
          <span className="play-list-song-item">Track</span>
          <span className="play-list-song-item">Album</span>
          <span className="play-list-song-item">Time</span>
          <span className="play-list-song-item">Artist</span>
          <span className="play-list-song-item">Added</span>
        </div>
      ) : (
        <div className="play-list-container-header">
          {' '}
          <span className="new-release-track-num">#</span>
          <span className="new-relase-playlist-item">Track</span>
          <span className="new-relase-playlist-item">Time</span>
          <span className="new-relase-playlist-item">Popularity</span>
          <span className="play-list-song-item">Artist</span>
        </div>
      )

    const {albumImageUrlsList, album, artist} = playList[currentIndex]

    return (
      <div>
        <div>
          <BackNavigation />
          <div className="header-album-display-container">
            <img
              src={playListDetails.playListImageUrl}
              alt={playListDetails.playListName}
              className="header-album-display-image"
            />
            <div className="header-display-details-container">
              <p className="category-heading">
                {category === "Editor's picks"
                  ? "Editor's Picks"
                  : 'New Releases'}
              </p>
              <h1 className="header-display-album-name">
                {playListDetails.playListName}
              </h1>
              <p className="header-display-artist-name">
                {playList[0].artist[0]}
              </p>
              <p className="header-display-artist-name">
                {playListDetails.playListDescription}
              </p>
            </div>
          </div>
        </div>
        <ul className="ul-el">
          {width > 576 && <>{playListHeader}</>}
          <hr className="hr-line" />

          {playList.map(each => (
            <ActiveCategory
              songsPlayList={playList}
              playlistDetails={each}
              key={each.id}
              id={each.id}
              onClickPlayListItem={this.onClickPlayListItem}
              isActive={each.id === playList[currentIndex].id}
              playSongItem={this.playSongItem}
              width={width}
            />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div className="player-component">
        <div className="player-component-main-container">
          <Header />
          <div>
            {this.renderPlayList()}
            {this.renderPlayer()}
          </div>
        </div>
      </div>
    )
  }
}

export default PlayerController

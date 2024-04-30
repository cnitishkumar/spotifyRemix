import './index.css'

const Loader = () => (
  <div className="loader-container" data-testid="loader">
    <img
      src="https://res.cloudinary.com/dqhiauk0o/image/upload/v1710321487/spotifyLogo_dyyodh.png"
      className="loader-image"
      alt="loader"
    />
    <h2 className="loading-heading">Loading...</h2>
  </div>
)

export default Loader

import './index.css'
import {Link} from 'react-router-dom'
import BackNavigation from '../BackNavigation'

const NotFound = () => (
  <div className="not-found-container">
    <div className="back-button-container">
      <BackNavigation />
    </div>
    <div className="not-found-image-container">
      <img
        src="https://res.cloudinary.com/dqhiauk0o/image/upload/v1710346958/404_wlwmmp.png"
        alt="page not found"
        className="not-found-image"
      />
      <h1 className="not-found-heading">Page Not Found</h1>{' '}
      <Link to="/" className="not-found-link-item">
        <button type="button" className="home-button">
          Home Page
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound

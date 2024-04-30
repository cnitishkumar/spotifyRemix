import {FiAlertTriangle} from 'react-icons/fi'
import './index.css'

const FailureView = props => {
  const {fetchAlbumsData} = props

  const onClickPlayAgain = () => {
    fetchAlbumsData()
  }

  return (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dqhiauk0o/image/upload/v1713712897/alert-triangle_a8sogs.png"
        className="failure-icon"
        alt="failure view"
      />
      <p className="failure-heading">Something went wrong. Please try again</p>
      <button
        type="button"
        className="try-agian-button"
        onClick={onClickPlayAgain}
      >
        Try Again
      </button>
    </div>
  )
}

export default FailureView

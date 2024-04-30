import {withRouter} from 'react-router-dom'

import './index.css'
import {FaArrowLeft} from 'react-icons/fa'

const BackNavigation = props => {
  const onClickBackButton = () => {
    const {history} = props

    history.goBack()
  }

  return (
    <button type="button" onClick={onClickBackButton} className="back-btn">
      <FaArrowLeft alt="backBtn" className="arrow-icon" /> Back
    </button>
  )
}

export default withRouter(BackNavigation)

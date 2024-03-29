import PropTypes from 'prop-types'
import React from 'react'
import '../styles/ProgressBar.css'

const ProgressBar = ({progress = 0}) => {
  return (
    <div>
      <div className="progress">
        <div className="progress-bar bg-polski" role="progressbar" style={{width: `${progress}%`}}
          aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}/>
      </div>
      <span>{progress}%</span>
    </div>
  )
}

ProgressBar.propTypes = {
  progress: PropTypes.number
}

export default ProgressBar

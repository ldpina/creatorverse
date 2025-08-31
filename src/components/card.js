import React from 'react'
import { Link } from 'react-router-dom'
import '../card.css'

const Card = (props) => {
  const goToYouTube = () => {
    window.open("https://www.youtube.com/@" + props.youtube, "_blank")
  }
  const goToTwitter = () => {
    window.open("https://www.twitter.com/" + props.twitter, "_blank")
  }
  const goToInstagram = () => {
    window.open("https://www.instagram.com/" + props.instagram, "_blank")
  }

  return (
    <div
      className="Card"
      style={{ backgroundImage: `url(${props.image})` }}
    >
      <div className="overlay">
        <div className="card-header-name">
          <h3>{props.name}</h3>
          {props.youtube && (
            <span className="fa-brands fa-youtube" onClick={goToYouTube}></span>
          )}
          {props.twitter && (
            <span className="fa-brands fa-twitter" onClick={goToTwitter}></span>
          )}
          {props.instagram && (
            <span className="fa-brands fa-instagram" onClick={goToInstagram}></span>
          )}
        </div>

        <div className="card-description">
          <p>{props.description}</p>
        </div>

        {/* Action buttons */}
        <div className="card-actions">
          <Link to={`/creators/${props.id}`} className="btn info-btn">
            <i className="fa-solid fa-circle-info"></i> View
          </Link>
          <Link to={`/creators/${props.id}/edit`} className="btn edit-btn">
            <i className="fa-solid fa-pen"></i> Edit
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Card

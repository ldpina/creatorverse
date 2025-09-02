import React from 'react'
import { Link } from 'react-router-dom'
import '../card.css'

const truncate = (text, maxLength = 80) => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "…" : text;
};



const Card = (props) => {
  return (
    <div
      className="Card"
      style={{ backgroundImage: `url(${props.image})` }}
    >
      <article className="overlay">
        <div className="card-header-name">
          <h3>{props.name}</h3>
        </div>

        {/* Description preview */}
        <div className="card-description">
          <p>{truncate(props.description, 40)}</p>
       </div>

        {/* Action buttons */}
        <div className="card-actions">
          
        {props.url && (
          <a
            href={props.url.startsWith('http') ? props.url : `https://${props.url}`}
            target="_blank"
            rel="noreferrer"
            className="btn visit-btn"
          >
            Visit
          </a>
        )}

          <Link to={`/creators/${props.id}`} className="btn info-btn">
            View
          </Link>
          <Link to={`/creators/${props.id}/edit`} className="btn edit-btn">
            Edit
          </Link>
        </div>
      </article>
    </div>
  )
}

export default Card

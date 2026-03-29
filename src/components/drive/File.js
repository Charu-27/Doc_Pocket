import { faFile } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./Dashboard.css"

export default function File({ file }) {
  return (
    <a
      href={file.url}
      target="_blank"
      rel="noopener noreferrer"
      className="drive-file-link drive-card-btn"
    >
      <div className="drive-card-icon">
        <FontAwesomeIcon icon={faFile} />
      </div>
      <div className="drive-card-label">{file.name}</div>
    </a>
  )
}

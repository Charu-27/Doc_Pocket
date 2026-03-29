import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolder } from "@fortawesome/free-solid-svg-icons"
import "./Dashboard.css"

export default function Folder({ folder }) {
  return (
    <Link to={`/folder/${folder.id}`} className="drive-card-btn">
      <div className="drive-card-icon">
        <FontAwesomeIcon icon={faFolder} />
      </div>
      <div className="drive-card-label">{folder.name}</div>
    </Link>
  )
}

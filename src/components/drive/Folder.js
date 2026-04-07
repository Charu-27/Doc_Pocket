import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolder } from "@fortawesome/free-solid-svg-icons"

export default function Folder({ folder }) {
  return (
    <Link to={`/folder/${folder.id}`} className="drive-card">
      <div className="drive-card-icon folder-icon">
        <FontAwesomeIcon icon={faFolder} />
      </div>
      <div className="drive-card-label">{folder.name}</div>
    </Link>
  )
}

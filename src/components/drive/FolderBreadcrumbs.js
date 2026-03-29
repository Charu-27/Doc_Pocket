import { Breadcrumb } from "react-bootstrap"
import { Link } from "react-router-dom"
import { ROOT_FOLDER } from "../../hooks/useFolder"
import "./Dashboard.css"

export default function FolderBreadcrumbs({ currentFolder }) {
  if (!currentFolder) return null

  let path = []
  if (currentFolder === ROOT_FOLDER) {
    path = []
  } else {
    path = [ROOT_FOLDER, ...(currentFolder.path || [])]
  }

  return (
    <Breadcrumb>
      {path.map((folder, index) => (
        <Breadcrumb.Item
          key={folder.id ?? `root-${index}`}
          linkAs={Link}
          linkProps={{
            to: folder.id ? `/folder/${folder.id}` : "/dashboard",
          }}
        >
          {folder.name}
        </Breadcrumb.Item>
      ))}
      <Breadcrumb.Item active>{currentFolder.name}</Breadcrumb.Item>
    </Breadcrumb>
  )
}

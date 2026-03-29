import { useNavigate, useParams } from "react-router-dom"
import { Button } from "react-bootstrap"
import AddFileButton from "./AddFileButton"
import AddFolderButton from "./AddFolderButton"
import Folder from "./Folder"
import File from "./File"
import FolderBreadcrumbs from "./FolderBreadcrumbs"
import { useFolder } from "../../hooks/useFolder"
import { useAuth } from "../../context/AuthContext"
import "./Dashboard.css"

export default function Dashboard() {
  const { folderId } = useParams()
  const resolvedFolderId = folderId ?? null
  const navigate = useNavigate()
  const { logout } = useAuth()
  const { folder, childFolders, childFiles } = useFolder(resolvedFolderId)

  async function handleLogout() {
    try {
      await logout()
      navigate("/", { replace: true })
    } catch {
      navigate("/", { replace: true })
    }
  }

  const hasFolders = childFolders.length > 0
  const hasFiles = childFiles.length > 0

  return (
    <div className="drive-layout">
      <header className="drive-topbar">
        <h1 className="drive-brand">Doc Pocket</h1>
        <div className="drive-topbar-actions">
          <Button variant="outline-light" size="sm" className="drive-btn-ghost" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </header>

      <main className="drive-main">
        <div className="drive-toolbar">
          <FolderBreadcrumbs currentFolder={folder} />
          <AddFileButton currentFolder={folder} />
          <AddFolderButton currentFolder={folder} />
        </div>

        {!hasFolders && !hasFiles && (
          <p className="drive-empty">
            This folder is empty. Create a folder or upload a file to get started.
          </p>
        )}

        {hasFolders && (
          <section className="drive-section" aria-labelledby="folders-heading">
            <h2 id="folders-heading" className="drive-section-title">
              Folders
            </h2>
            <div className="drive-grid">
              {childFolders.map(childFolder => (
                <Folder key={childFolder.id} folder={childFolder} />
              ))}
            </div>
          </section>
        )}

        {hasFolders && hasFiles && <hr className="drive-divider" />}

        {hasFiles && (
          <section className="drive-section" aria-labelledby="files-heading">
            <h2 id="files-heading" className="drive-section-title">
              Files
            </h2>
            <div className="drive-grid">
              {childFiles.map(childFile => (
                <File key={childFile.id} file={childFile} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

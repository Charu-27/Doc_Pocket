import { useState, useCallback, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faSignOutAlt,
  faSearch,
  faFolder,
  faFile,
  faCloudUploadAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons"
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
  const { logout, currentUser } = useAuth()
  const { folder, childFolders, childFiles } = useFolder(resolvedFolderId)
  const [searchQuery, setSearchQuery] = useState("")
  const [dragging, setDragging] = useState(false)
  const dragCounter = useRef(0)

  async function handleLogout() {
    try {
      await logout()
      navigate("/", { replace: true })
    } catch {
      navigate("/", { replace: true })
    }
  }

  const filteredFolders = childFolders.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const filteredFiles = childFiles.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const hasFolders = filteredFolders.length > 0
  const hasFiles = filteredFiles.length > 0
  const isEmpty = !hasFolders && !hasFiles
  const totalItems = childFolders.length + childFiles.length

  const handleDragEnter = useCallback(e => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current += 1
    if (e.dataTransfer?.types?.includes("Files")) {
      setDragging(true)
    }
  }, [])

  const handleDragLeave = useCallback(e => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current -= 1
    if (dragCounter.current <= 0) {
      dragCounter.current = 0
      setDragging(false)
    }
  }, [])

  const handleDragOver = useCallback(e => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const fileUploadRef = useRef(null)

  const handleDrop = useCallback(
    e => {
      e.preventDefault()
      e.stopPropagation()
      dragCounter.current = 0
      setDragging(false)
      const files = e.dataTransfer?.files
      if (files?.length && fileUploadRef.current) {
        Array.from(files).forEach(f => fileUploadRef.current(f))
      }
    },
    []
  )

  const userInitial = currentUser?.email?.[0]?.toUpperCase() || "?"

  return (
    <div
      className="drive-layout"
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <header className="drive-topbar">
        <div className="drive-topbar-left">
          <h1 className="drive-brand">Doc Pocket</h1>
        </div>

        <div className="drive-search-wrapper">
          <FontAwesomeIcon icon={faSearch} className="drive-search-icon" />
          <input
            type="text"
            className="drive-search"
            placeholder="Search files and folders…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="drive-search-clear"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>

        <div className="drive-topbar-right">
          <div className="drive-user-avatar" title={currentUser?.email}>
            {userInitial}
          </div>
          <span className="drive-user-email">{currentUser?.email}</span>
          <Button
            variant="outline-light"
            size="sm"
            className="drive-btn-ghost"
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="me-1" />
            Log out
          </Button>
        </div>
      </header>

      <main className="drive-main">
        <div className="drive-toolbar">
          <FolderBreadcrumbs currentFolder={folder} />
          <div className="drive-toolbar-actions">
            <AddFileButton currentFolder={folder} uploadRef={fileUploadRef} />
            <AddFolderButton currentFolder={folder} />
          </div>
        </div>

        {totalItems > 0 && (
          <div className="drive-stats">
            <span className="drive-stat-item">
              <FontAwesomeIcon icon={faFolder} className="drive-stat-icon" />
              {childFolders.length} folder{childFolders.length !== 1 ? "s" : ""}
            </span>
            <span className="drive-stats-dot" />
            <span className="drive-stat-item">
              <FontAwesomeIcon icon={faFile} className="drive-stat-icon" />
              {childFiles.length} file{childFiles.length !== 1 ? "s" : ""}
            </span>
          </div>
        )}

        {isEmpty && !searchQuery && (
          <div className="drive-empty">
            <div className="drive-empty-icon">
              <FontAwesomeIcon icon={faCloudUploadAlt} />
            </div>
            <h3>This folder is empty</h3>
            <p>
              Drag & drop files here, or use the buttons above to upload files
              and create folders.
            </p>
          </div>
        )}

        {isEmpty && searchQuery && (
          <div className="drive-empty">
            <div className="drive-empty-icon">
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <h3>No results found</h3>
            <p>Nothing matches &ldquo;{searchQuery}&rdquo;</p>
          </div>
        )}

        {hasFolders && (
          <section className="drive-section" aria-labelledby="folders-heading">
            <h2 id="folders-heading" className="drive-section-title">
              <FontAwesomeIcon icon={faFolder} className="me-2" />
              Folders
              <span className="drive-section-count">{filteredFolders.length}</span>
            </h2>
            <div className="drive-grid">
              {filteredFolders.map(childFolder => (
                <Folder key={childFolder.id} folder={childFolder} />
              ))}
            </div>
          </section>
        )}

        {hasFiles && (
          <section className="drive-section" aria-labelledby="files-heading">
            <h2 id="files-heading" className="drive-section-title">
              <FontAwesomeIcon icon={faFile} className="me-2" />
              Files
              <span className="drive-section-count">{filteredFiles.length}</span>
            </h2>
            <div className="drive-grid">
              {filteredFiles.map(childFile => (
                <File key={childFile.id} file={childFile} />
              ))}
            </div>
          </section>
        )}
      </main>

      {dragging && (
        <div className="drive-drop-overlay">
          <div className="drive-drop-content">
            <FontAwesomeIcon
              icon={faCloudUploadAlt}
              className="drive-drop-icon"
            />
            <p className="drive-drop-text">Drop files here to upload</p>
          </div>
        </div>
      )}
    </div>
  )
}

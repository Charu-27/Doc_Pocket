import { useState } from "react"
import { createPortal } from "react-dom"
import { faFileUpload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useAuth } from "../../context/AuthContext"
import { storage, database } from "../../config/firebase"
import { ROOT_FOLDER } from "../../hooks/useFolder"
import { v4 as uuidV4 } from "uuid"
import { ProgressBar, Toast } from "react-bootstrap"
import "./Dashboard.css"

export default function AddFileButton({ currentFolder }) {
  const [uploadingFiles, setUploadingFiles] = useState([])
  const { currentUser } = useAuth()

  function handleUpload(e) {
    const file = e.target.files?.[0]
    e.target.value = ""
    if (currentFolder == null || file == null || !currentUser?.uid) return

    const id = uuidV4()
    setUploadingFiles(prev => [...prev, { id, name: file.name, progress: 0, error: false }])

    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${(currentFolder.path || []).join("/")}/${file.name}`.replace(/^\//, "")
        : `${(currentFolder.path || []).join("/")}/${currentFolder.name}/${file.name}`.replace(
            /^\//,
            ""
          )

    const uploadTask = storage.ref(`/files/${currentUser.uid}/${filePath}`).put(file)

    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress =
          snapshot.totalBytes > 0 ? snapshot.bytesTransferred / snapshot.totalBytes : 0
        setUploadingFiles(prev =>
          prev.map(f => (f.id === id ? { ...f, progress } : f))
        )
      },
      () => {
        setUploadingFiles(prev =>
          prev.map(f => (f.id === id ? { ...f, error: true } : f))
        )
      },
      () => {
        setUploadingFiles(prev => prev.filter(f => f.id !== id))
        uploadTask.snapshot.ref.getDownloadURL().then(url => {
          database.files
            .where("name", "==", file.name)
            .where("userId", "==", currentUser.uid)
            .where("folderId", "==", currentFolder.id)
            .get()
            .then(existingFiles => {
              const existingFile = existingFiles.docs[0]
              if (existingFile) {
                existingFile.ref.update({ url })
              } else {
                database.files.add({
                  url,
                  name: file.name,
                  createdAt: database.getCurrentTimestamp(),
                  folderId: currentFolder.id,
                  userId: currentUser.uid,
                })
              }
            })
        })
      }
    )
  }

  return (
    <>
      <label className="btn btn-primary btn-sm drive-btn-primary mb-0">
        <FontAwesomeIcon icon={faFileUpload} className="me-2" />
        Upload file
        <input
          type="file"
          className="d-none"
          onChange={handleUpload}
          aria-label="Upload file"
        />
      </label>

      {uploadingFiles.length > 0 &&
        createPortal(
          <div className="upload-toast-stack">
            {uploadingFiles.map(file => (
              <Toast
                key={file.id}
                onClose={() =>
                  setUploadingFiles(prev => prev.filter(f => f.id !== file.id))
                }
                className="mb-2"
              >
                <Toast.Header closeButton={file.error}>{file.name}</Toast.Header>
                <Toast.Body>
                  <ProgressBar
                    animated={!file.error}
                    variant={file.error ? "danger" : "primary"}
                    now={file.error ? 100 : file.progress * 100}
                    label={
                      file.error ? "Error" : `${Math.round(file.progress * 100)}%`
                    }
                  />
                </Toast.Body>
              </Toast>
            ))}
          </div>,
          document.body
        )}
    </>
  )
}

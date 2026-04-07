import { useState, useCallback, useEffect } from "react"
import { createPortal } from "react-dom"
import { faFileUpload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useAuth } from "../../context/AuthContext"
import { storage, database } from "../../config/firebase"
import { ROOT_FOLDER } from "../../hooks/useFolder"
import { v4 as uuidV4 } from "uuid"
import { ProgressBar, Toast } from "react-bootstrap"

export default function AddFileButton({ currentFolder, uploadRef }) {
  const [uploadingFiles, setUploadingFiles] = useState([])
  const { currentUser } = useAuth()

  const uploadFile = useCallback(
    function uploadFile(file) {
      if (!currentFolder || !file || !currentUser?.uid) return

      const id = uuidV4()
      setUploadingFiles(prev => [
        ...prev,
        { id, name: file.name, progress: 0, error: false, errorMsg: "" },
      ])

      const parentPath = (currentFolder.path || [])
        .map(entry => (typeof entry === "string" ? entry : entry.name))
        .filter(Boolean)
        .join("/")

      const filePath =
        currentFolder === ROOT_FOLDER
          ? file.name
          : [parentPath, currentFolder.name, file.name].filter(Boolean).join("/")

      const uploadTask = storage
        .ref(`/files/${currentUser.uid}/${filePath}`)
        .put(file)

      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress =
            snapshot.totalBytes > 0
              ? snapshot.bytesTransferred / snapshot.totalBytes
              : 0
          setUploadingFiles(prev =>
            prev.map(f => (f.id === id ? { ...f, progress } : f))
          )
        },
        err => {
          console.error("Storage upload failed:", err)
          const msg =
            err?.code === "storage/unauthorized"
              ? "Permission denied — check Firebase Storage rules"
              : err?.code === "storage/canceled"
                ? "Upload cancelled"
                : err?.message || "Upload failed"
          setUploadingFiles(prev =>
            prev.map(f =>
              f.id === id ? { ...f, error: true, errorMsg: msg } : f
            )
          )
        },
        () => {
          setUploadingFiles(prev =>
            prev.map(f => (f.id === id ? { ...f, progress: 1 } : f))
          )

          uploadTask.snapshot.ref
            .getDownloadURL()
            .then(url =>
              database.files
                .where("name", "==", file.name)
                .where("userId", "==", currentUser.uid)
                .where("folderId", "==", currentFolder.id)
                .get()
                .then(existing => {
                  const doc = existing.docs[0]
                  if (doc) return doc.ref.update({ url })
                  return database.files.add({
                    url,
                    name: file.name,
                    createdAt: database.getCurrentTimestamp(),
                    folderId: currentFolder.id,
                    userId: currentUser.uid,
                  })
                })
            )
            .then(() => {
              setUploadingFiles(prev => prev.filter(f => f.id !== id))
            })
            .catch(err => {
              console.error("Post-upload save failed:", err)
              setUploadingFiles(prev =>
                prev.map(f =>
                  f.id === id
                    ? {
                        ...f,
                        error: true,
                        errorMsg:
                          err?.message?.includes("index")
                            ? "Missing Firestore index — check console for link"
                            : "File uploaded but failed to save metadata",
                      }
                    : f
                )
              )
            })
        }
      )
    },
    [currentFolder, currentUser]
  )

  useEffect(() => {
    if (uploadRef) uploadRef.current = uploadFile
  }, [uploadFile, uploadRef])

  function handleUpload(e) {
    const file = e.target.files?.[0]
    if (e.target) e.target.value = ""
    uploadFile(file)
  }

  return (
    <>
      <label
        className={`btn btn-primary btn-sm drive-btn-primary mb-0${!currentFolder ? " disabled" : ""}`}
      >
        <FontAwesomeIcon icon={faFileUpload} className="me-2" />
        Upload file
        <input
          type="file"
          className="d-none"
          onChange={handleUpload}
          disabled={!currentFolder}
          aria-label="Upload file"
        />
      </label>

      {uploadingFiles.length > 0 &&
        createPortal(
          <div className="upload-toast-stack">
            {uploadingFiles.map(f => (
              <Toast
                key={f.id}
                onClose={() =>
                  setUploadingFiles(prev => prev.filter(x => x.id !== f.id))
                }
                className="mb-2"
              >
                <Toast.Header closeButton>
                  <strong className="me-auto text-truncate" style={{ maxWidth: 220 }}>
                    {f.name}
                  </strong>
                </Toast.Header>
                <Toast.Body>
                  <ProgressBar
                    animated={!f.error && f.progress < 1}
                    variant={f.error ? "danger" : f.progress >= 1 ? "success" : "primary"}
                    now={f.error ? 100 : f.progress * 100}
                    label={
                      f.error
                        ? f.errorMsg || "Error"
                        : f.progress >= 1
                          ? "Saving…"
                          : `${Math.round(f.progress * 100)}%`
                    }
                    style={{ height: "1.5rem", fontSize: "0.75rem" }}
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

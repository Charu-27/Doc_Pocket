import { useState } from "react"
import { Button, Modal, Form } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons"
import { database } from "../../config/firebase"
import { useAuth } from "../../context/AuthContext"
import { ROOT_FOLDER } from "../../hooks/useFolder"
import "./Dashboard.css"

export default function AddFolderButton({ currentFolder }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const { currentUser } = useAuth()

  function handleSubmit(e) {
    e.preventDefault()
    if (currentFolder == null || !currentUser?.uid) return

    const path = [...(currentFolder.path || [])]
    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id })
    }

    database.folders.add({
      name: name.trim(),
      parentId: currentFolder.id,
      userId: currentUser.uid,
      path,
      createdAt: database.getCurrentTimestamp(),
    })
    setName("")
    setOpen(false)
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="success"
        className="drive-btn-primary"
        size="sm"
      >
        <FontAwesomeIcon icon={faFolderPlus} className="me-2" />
        New folder
      </Button>
      <Modal show={open} onHide={() => setOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create folder</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                autoFocus
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Work, Receipts"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" type="button" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="success" type="submit">
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

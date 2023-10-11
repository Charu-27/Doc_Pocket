

import React from "react"
import { Link } from "react-router-dom"
import { Button ,Card} from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolder } from "@fortawesome/free-solid-svg-icons"



export default function Folder({ folder }) {
  return (
    <div className="foldercontainer">
   <Button
      to={{
        pathname: `/folder/${folder.id}`,
        state: { folder: folder },
      }}
      as={Link} className="link4">
        <Card className="files">
     <FontAwesomeIcon icon={faFolder}  />
      {folder.name}</Card>
  </Button>
  </div>
  )
}
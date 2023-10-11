import { faFile } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import {Card} from "react-bootstrap"
import "./Dashboard.css"

export default function File({ file }) {
  return (
    <div className="filecontainer">
    <a 
      href={file.url}
      target="_blank"
      className="link4"
    ><Card className="files">
      <FontAwesomeIcon icon={faFile}  />
      {file.name} </Card>
    </a>
   </div>
  )
}

 
     
 
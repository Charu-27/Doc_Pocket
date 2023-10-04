import React from "react"
import { Container,Navbar } from "react-bootstrap"
import AddFileButton from "./AddFileButton"
import AddFolderButton from "./AddFolderButton"
import Folder from "./Folder"
import File from "./File"
import FolderBreadcrumbs from "./FolderBreadcrumbs"
import  {useFolder}  from "../hooks/useFolder"
import { useParams, useLocation } from "react-router-dom"



export default function Dashboard() {
  const { folderId } = useParams()
  const { state = {} } = useLocation()
  const {folder, childFolders,childFiles} = useFolder(folderId)
  console.log(childFolders)
   
  return (
    <>
      <Navbar />
      <Container fluid>
          <AddFolderButton currentFolder={folder} />
          {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map(childFolders => (
              <div 
                key={childFolders.id}
              ><Folder folder={childFolders} />
           </div>))}
           </div>
        )}

      </Container>
    </>
  )
}
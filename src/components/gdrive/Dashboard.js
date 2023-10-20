import React from "react"
import { Container,Navbar } from "react-bootstrap"
import AddFileButton from "./AddFileButton"
import AddFolderButton from "./AddFolderButton"
import Folder from "./Folder"
import File from "./File"
import FolderBreadcrumbs from "./FolderBreadcrumbs"
import  {useFolder}  from "../hooks/useFolder"
import { useParams} from "react-router-dom"
import "./Dashboard.css"



export default function Dashboard() {
  const { folderId } = useParams()
  
  const {folder, childFolders,childFiles} = useFolder(folderId)
  console.log(childFolders)
   
  return (
    <>
    <div className="dashboard">
      <div >
      <Navbar className="navbar" >
      <h1 className="header4">Dashboard
     
        <a className="navlink "  href="/">Logout</a>
        <a  className="navlink " href="Signup">Signup</a> </h1>
        </Navbar></div>
      <Container fluid className="container4">
        <div>
        <FolderBreadcrumbs currentFolder={folder}/>
         <AddFileButton currentFolder={folder} />
          <AddFolderButton currentFolder={folder} />
          </div>
          {childFolders.length > 0 && (
          <div className="navlink">
            {childFolders.map(childFolder => (
              <div
                key={childFolder.id}
                style={{ maxWidth: "250px" }}
                className="navlink"
              >
                <Folder className="navlink" folder={childFolder} />
              </div>
            ))}
          </div>
        )}
        {childFolders.length > 0 && childFiles.length > 0 && <hr />}
        {childFiles.length > 0 && (
          <div className="navlink">
            {childFiles.map(childFile => (
              <div
                key={childFile.id}
                style={{ maxWidth: "250px" }}
                className="p-2"
              >
                <File className="navlink" file={childFile} />
              </div>
            ))}
          </div>
        )}
          
      </Container></div>
    </>
  )
}
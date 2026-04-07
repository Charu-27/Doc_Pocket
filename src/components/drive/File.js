import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFile,
  faFilePdf,
  faFileWord,
  faFileExcel,
  faFilePowerpoint,
  faFileImage,
  faFileVideo,
  faFileAudio,
  faFileZipper,
  faFileCode,
  faFileCsv,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons"

const EXT_MAP = {
  pdf: { icon: faFilePdf, cls: "file-icon-pdf" },
  doc: { icon: faFileWord, cls: "file-icon-document" },
  docx: { icon: faFileWord, cls: "file-icon-document" },
  odt: { icon: faFileWord, cls: "file-icon-document" },
  xls: { icon: faFileExcel, cls: "file-icon-spreadsheet" },
  xlsx: { icon: faFileExcel, cls: "file-icon-spreadsheet" },
  csv: { icon: faFileCsv, cls: "file-icon-spreadsheet" },
  ppt: { icon: faFilePowerpoint, cls: "file-icon-presentation" },
  pptx: { icon: faFilePowerpoint, cls: "file-icon-presentation" },
  jpg: { icon: faFileImage, cls: "file-icon-image" },
  jpeg: { icon: faFileImage, cls: "file-icon-image" },
  png: { icon: faFileImage, cls: "file-icon-image" },
  gif: { icon: faFileImage, cls: "file-icon-image" },
  svg: { icon: faFileImage, cls: "file-icon-image" },
  webp: { icon: faFileImage, cls: "file-icon-image" },
  bmp: { icon: faFileImage, cls: "file-icon-image" },
  mp4: { icon: faFileVideo, cls: "file-icon-video" },
  avi: { icon: faFileVideo, cls: "file-icon-video" },
  mov: { icon: faFileVideo, cls: "file-icon-video" },
  mkv: { icon: faFileVideo, cls: "file-icon-video" },
  webm: { icon: faFileVideo, cls: "file-icon-video" },
  mp3: { icon: faFileAudio, cls: "file-icon-audio" },
  wav: { icon: faFileAudio, cls: "file-icon-audio" },
  ogg: { icon: faFileAudio, cls: "file-icon-audio" },
  flac: { icon: faFileAudio, cls: "file-icon-audio" },
  zip: { icon: faFileZipper, cls: "file-icon-archive" },
  rar: { icon: faFileZipper, cls: "file-icon-archive" },
  "7z": { icon: faFileZipper, cls: "file-icon-archive" },
  tar: { icon: faFileZipper, cls: "file-icon-archive" },
  gz: { icon: faFileZipper, cls: "file-icon-archive" },
  js: { icon: faFileCode, cls: "file-icon-code" },
  ts: { icon: faFileCode, cls: "file-icon-code" },
  jsx: { icon: faFileCode, cls: "file-icon-code" },
  tsx: { icon: faFileCode, cls: "file-icon-code" },
  py: { icon: faFileCode, cls: "file-icon-code" },
  java: { icon: faFileCode, cls: "file-icon-code" },
  html: { icon: faFileCode, cls: "file-icon-code" },
  css: { icon: faFileCode, cls: "file-icon-code" },
  json: { icon: faFileCode, cls: "file-icon-code" },
  xml: { icon: faFileCode, cls: "file-icon-code" },
  txt: { icon: faFileLines, cls: "file-icon-default" },
  md: { icon: faFileLines, cls: "file-icon-default" },
}

function getFileInfo(name) {
  const ext = (name || "").split(".").pop().toLowerCase()
  const match = EXT_MAP[ext]
  return {
    icon: match?.icon || faFile,
    cls: match?.cls || "file-icon-default",
    ext: name?.includes(".") ? ext : "",
  }
}

export default function File({ file }) {
  const { icon, cls, ext } = getFileInfo(file.name)

  return (
    <a
      href={file.url}
      target="_blank"
      rel="noopener noreferrer"
      className="drive-card"
    >
      <div className={`drive-card-icon ${cls}`}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="drive-card-label">{file.name}</div>
      {ext && <div className="drive-card-ext">{ext}</div>}
    </a>
  )
}

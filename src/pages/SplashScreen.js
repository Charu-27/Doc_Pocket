import { Link } from "react-router-dom"
import "./SplashScreen.css"

export default function SplashScreen() {
  return (
    <div className="splash-page">
      <div className="splash-inner">
        <h1 className="splash-title">Doc Pocket</h1>
        <p className="splash-lead">
          Organize folders and files in one place. Sign in to your library or create a new account.
        </p>
        <div className="splash-actions">
          <Link to="/login" className="splash-btn splash-btn-primary">
            Sign in
          </Link>
          <Link to="/signup" className="splash-btn splash-btn-secondary">
            Create account
          </Link>
        </div>
      </div>
    </div>
  )
}

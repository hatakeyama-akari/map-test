import * as React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <div>{children}</div>
    </>
  )
}

export default Layout

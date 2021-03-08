import * as React from "react"
import { PageProps } from "gatsby"

import Layout from "../components/layout"

const NotFoundPage: React.FC<PageProps> = () => (
  <Layout>
    <h1>You are here!</h1>
    <h2>But nothing found for you #404</h2>
  </Layout>
)

export default NotFoundPage

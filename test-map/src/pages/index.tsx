import * as React from "react"
import { PageProps } from "gatsby"

import Layout from "../components/layout"
import Map from "../components/map"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Map />
    </Layout>
  )
}

export default IndexPage

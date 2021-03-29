import * as React from "react"
import { PageProps, graphql } from "gatsby"

import Map from "../components/map"
import Sidebar from "../components/sidebar"

import Layout from "../components/layout"

type DataProps = {
  site: {
    buildTime: string
  }
}

const IndexPage: React.FC<PageProps<DataProps>> = ({ data, path }) => {
  return (
    <Layout>
      <Map />
      <Sidebar />
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  {
    site {
      buildTime(formatString: "YYYY-MM-DD hh:mm a z")
    }
  }
`

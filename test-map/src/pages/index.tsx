import * as React from "react"
import { PageProps, graphql } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import { Typography, Container, Button, Link } from "@material-ui/core"

import Map from "../components/map"

import Layout from "../components/layout"

const useStyles = makeStyles({
  container: {},
})

type DataProps = {
  site: {
    buildTime: string
  }
}

const IndexPage: React.FC<PageProps<DataProps>> = ({ data, path }) => {
  const classes = useStyles()
  return (
    <Layout>
      <Map />
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

import * as React from "react"
import { PageProps, graphql } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import { Typography, Container, Button, Link } from "@material-ui/core"

import Layout from "../components/layout"

const useStyles = makeStyles({
  container: { margin: 30 },
  button: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
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
      <Container className={classes.container}>
        <Typography variant="h3">
          Gatsby supports TypeScript by default!
        </Typography>
        <Typography>
          This means that you can create and write <em>.ts/.tsx</em> files for
          your pages, components etc. Please note that the <em>gatsby-*.js</em>{" "}
          files (like gatsby-node.js) currently don't support TypeScript yet.
        </Typography>
        <Typography>
          For type checking you'll want to install <em>typescript</em> via npm
          and run <em>tsc --init</em> to create a <em>.tsconfig</em> file.
        </Typography>
        <Typography>
          You're currently on the page "{path}" which was built on{" "}
          {data.site.buildTime}.
        </Typography>
        <Typography>
          To learn more, head over to our{" "}
          <Link href="https://www.gatsbyjs.com/docs/typescript/">
            documentation about TypeScript
          </Link>
          .
        </Typography>
        <Button className={classes.button}>Styled with Hook API</Button>
      </Container>
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

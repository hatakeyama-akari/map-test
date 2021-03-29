import * as React from "react"
import { PageProps } from "gatsby"
import axios from "axios"

import Layout from "../components/layout"
import Map from "../components/map"
import Sidebar from "../components/sidebar"

import { MAPBOX_ACCESS_TOKEN } from "../secret"

type DataProps = {
  site: {
    buildTime: string
  }
}

async function getIsochrone(mode: string, minutes: string) {
  const urlBase = "https://api.mapbox.com/isochrone/v1/mapbox/"
  const lon = 139.71600802692055
  const lat = 35.6683063172107

  const query =
    urlBase +
    mode +
    "/" +
    lon +
    "," +
    lat +
    "?contours_minutes=" +
    minutes +
    "&polygons=true&access_token=" +
    MAPBOX_ACCESS_TOKEN

  console.log(query)

  try {
    const response = await axios.get(query)
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}

function isochroneCallback(params) {
  console.log(params)
  getIsochrone(params.mode, params.duration)
}

const IndexPage: React.FC<PageProps<DataProps>> = () => {
  return (
    <Layout>
      <Map />
      <Sidebar isochroneCallback={isochroneCallback} />
    </Layout>
  )
}

export default IndexPage

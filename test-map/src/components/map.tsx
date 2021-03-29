import React, { useRef, useEffect, useState } from "react"
import axios from "axios"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

import Sidebar from "../components/sidebar"

import { MAPBOX_ACCESS_TOKEN } from "../secret"

const mapContainerStyle = {
  position: "absolute",
  top: 0,
  bottom: 0,
  width: "100%",
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

const Map = () => {
  const mapContainerRef = useRef(null)

  const [map, setMap] = useState(null)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      accessToken: MAPBOX_ACCESS_TOKEN,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [139.71600802692055, 35.6683063172107],
      zoom: 13,
    })
    map.addControl(new mapboxgl.NavigationControl(), "top-right")

    setMap(map)

    return () => map.remove()
  }, [])

  return (
    <>
      <div ref={mapContainerRef} style={mapContainerStyle} />
      <Sidebar isochroneCallback={isochroneCallback} />
    </>
  )
}

export default Map

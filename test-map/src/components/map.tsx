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

async function getIsochrone(map, mode: string, minutes: string) {
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

  try {
    const response = await axios.get(query)
    // Set the 'iso' source's data to what's returned by the API query
    map.getSource("iso").setData(response.data)
  } catch (error) {
    console.error(error)
  }
}

const Map = () => {
  const mapContainerRef = useRef(null)
  const [map, setMap] = useState(null)

  const INITIAL_PARAMS = {
    mode: "walking",
    duration: "10",
  }

  const INITIAL_LON = 139.71595002
  const INITIAL_LAT = 35.66809232

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      accessToken: MAPBOX_ACCESS_TOKEN,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [INITIAL_LON, INITIAL_LAT],
      zoom: 13,
    })
    map.addControl(new mapboxgl.NavigationControl(), "top-right")

    setMap(map)

    const marker = new mapboxgl.Marker({
      color: "#314ccd",
    })

    // Create a LngLat object to use in the marker initialization
    // https://docs.mapbox.com/mapbox-gl-js/api/#lnglat
    const lngLat = {
      lon: INITIAL_LON,
      lat: INITIAL_LAT,
    }

    map.on("load", () => {
      // Initialize the marker at the query coordinates
      marker.setLngLat(lngLat).addTo(map)

      // When the map loads, add the source and layer
      map.addSource("iso", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      })

      map.addLayer(
        {
          id: "isoLayer",
          type: "fill",
          // Use "iso" as the data source for this layer
          source: "iso",
          layout: {},
          paint: {
            // The fill color for the layer is set to a light purple
            "fill-color": "#5a3fc0",
            "fill-opacity": 0.3,
          },
        },
        "poi-label"
      )

      // Make the API call
      getIsochrone(map, INITIAL_PARAMS.mode, INITIAL_PARAMS.duration)
    })
  }, [])

  function isochroneCallback(params) {
    if (map) {
      getIsochrone(map, params.mode, params.duration)
    }
  }

  return (
    <>
      <div ref={mapContainerRef} style={mapContainerStyle} />
      <Sidebar isochroneCallback={isochroneCallback} />
    </>
  )
}

export default Map

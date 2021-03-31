import React, { useRef, useEffect, useState } from "react"
import axios from "axios"
import { makeStyles } from "@material-ui/core/styles"
import mapboxgl from "mapbox-gl/dist/mapbox-gl"
import MapboxWorker from "mapbox-gl/dist/mapbox-gl-csp-worker"
import "mapbox-gl/dist/mapbox-gl.css"

import Sidebar from "../components/sidebar"
import LonLatBox from "../components/lonlat-box"

import { MAPBOX_ACCESS_TOKEN } from "../secret"

const INITIAL_LON = 139.71595002
const INITIAL_LAT = 35.66809232

const INITIAL_MODE = "walking"
const INITIAL_DURATION = "10"

const useStyles = makeStyles({
  mapContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "100%",
  },
})

// Wire up loaded worker to be used instead of the default
mapboxgl.workerClass = MapboxWorker

const Map: React.FC = () => {
  const classes = useStyles()

  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const [map, setMap] = useState()
  const [lonLat, setLonLat] = useState({
    lon: INITIAL_LON,
    lat: INITIAL_LAT,
  })
  const [isoParams, setIsoParams] = useState({
    mode: INITIAL_MODE,
    duration: INITIAL_DURATION,
  })

  const marker = new mapboxgl.Marker({
    color: "#314ccd",
    draggable: true,
  })

  marker.on("dragend", onDragEnd)

  function onDragEnd() {
    const lngLat = marker.getLngLat()
    setLonLat({
      lon: lngLat.lng,
      lat: lngLat.lat,
    })
  }

  useEffect(() => {
    if (!mapContainerRef.current) {
      return
    }
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      accessToken: MAPBOX_ACCESS_TOKEN,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [INITIAL_LON, INITIAL_LAT],
      zoom: 13,
    })
    map.addControl(new mapboxgl.NavigationControl(), "top-right")

    setMap(map)

    map.on("load", () => {
      // Initialize the marker at the query coordinates
      marker.setLngLat(lonLat).addTo(map)

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
      getIsochrone(map, isoParams.mode, isoParams.duration)
    })
  }, [])

  useEffect(() => {
    map && getIsochrone(map, isoParams.mode, isoParams.duration)
  }, [lonLat])

  function isochroneCallback(params: { mode: string; duration: string }) {
    setIsoParams(params)
    map && getIsochrone(map, params.mode, params.duration)
  }

  async function getIsochrone(map: any, mode: string, duration: string) {
    const urlBase = "https://api.mapbox.com/isochrone/v1/mapbox/"

    const query =
      urlBase +
      mode +
      "/" +
      lonLat.lon +
      "," +
      lonLat.lat +
      "?contours_minutes=" +
      duration +
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

  return (
    <>
      <div ref={mapContainerRef} className={classes.mapContainer} />
      <Sidebar isochroneCallback={isochroneCallback} />
      <LonLatBox lon={lonLat.lon} lat={lonLat.lat} />
    </>
  )
}

export default Map

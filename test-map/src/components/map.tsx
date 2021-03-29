import React, { useRef, useEffect, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiaGF0YWtleWFtYTAiLCJhIjoiY2tseWdtNzl5MDM2ZzJxcGZtaXliaXR6YiJ9.9TxbJAWYCVPnZEZ5kSy-sw"

const mapContainerStyle = {
  position: "absolute",
  top: 0,
  bottom: 0,
  width: "100%",
}

const Map = () => {
  const mapContainerRef = useRef(null)

  const [map, setMap] = useState(null)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      accessToken: MAPBOX_TOKEN,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [139.71600802692055, 35.6683063172107],
      zoom: 13,
    })
    map.addControl(new mapboxgl.NavigationControl(), "top-right")

    setMap(map)

    return () => map.remove()
  }, [])

  return <div ref={mapContainerRef} style={mapContainerStyle} />
}

export default Map

import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Paper, Typography } from "@material-ui/core"

const useStyles = makeStyles({
  lonLatPaper: {
    position: "absolute",
    bottom: 40,
    left: 16,
    backgroundColor: "black",
    opacity: "0.7",
    padding: 8,
  },
  lonLat: {
    color: "white",
    fontFamily: "sans-serif",
  },
})

const LonLatBox = (prop: { lon: number; lat: number }) => {
  const classes = useStyles()

  return (
    <Paper className={classes.lonLatPaper}>
      <Typography variant="body2" className={classes.lonLat}>
        Longitude: {prop.lon} <br />
        Latitude: {prop.lat}
      </Typography>
    </Paper>
  )
}

export default LonLatBox

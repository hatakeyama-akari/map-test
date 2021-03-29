import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Paper,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Box,
} from "@material-ui/core"

const useStyles = makeStyles({
  container: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "white",
    opacity: "0.95",
    padding: 16,
  },
})

const Sidebar = () => {
  const classes = useStyles()

  const [mode, setMode] = React.useState("walking")

  const handleChangeMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMode((event.target as HTMLInputElement).value)
  }

  const [duration, setDuration] = React.useState("10")

  const handleChangeDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuration((event.target as HTMLInputElement).value)
  }

  return (
    <Paper elevation={3} className={classes.container}>
      <Box>
        <FormControl component="fieldset">
          <FormLabel component="legend">Choose a travel mode:</FormLabel>
          <RadioGroup
            row
            aria-label="mode"
            name="mode"
            value={mode}
            onChange={handleChangeMode}
          >
            <FormControlLabel
              value="walking"
              control={<Radio color="primary" />}
              label="Walking"
            />
            <FormControlLabel
              value="cycling"
              control={<Radio color="primary" />}
              label="Cycling"
            />
            <FormControlLabel
              value="driving"
              control={<Radio color="primary" />}
              label="Driving"
            />
          </RadioGroup>
        </FormControl>
      </Box>

      <Box style={{ marginTop: 8 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Choose a maximum duration:</FormLabel>
          <RadioGroup
            row
            aria-label="duration"
            name="duration"
            value={duration}
            onChange={handleChangeDuration}
          >
            <FormControlLabel
              value="10"
              control={<Radio color="primary" />}
              label="10 min"
            />
            <FormControlLabel
              value="20"
              control={<Radio color="primary" />}
              label="20 min"
            />
            <FormControlLabel
              value="30"
              control={<Radio color="primary" />}
              label="30 min"
            />
          </RadioGroup>
        </FormControl>
      </Box>
    </Paper>
  )
}

export default Sidebar

import React from 'react'
import { LinearProgress } from '@material-ui/core'
import { makeStyles, createStyles  } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => createStyles({
  bar: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

const Progress = () => {
  const classes = useStyles()
  return (
    <div className={classes.bar}>
      <LinearProgress />
    </div>
  )
}

export default Progress
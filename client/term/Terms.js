import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ArrowForward from '@material-ui/icons/ArrowForward'
import AssignmentIcon from '@material-ui/icons/Assignment'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'

import {Link} from 'react-router-dom'
import {list} from './api-term.js'


const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: `${theme.spacing(5)}px ${theme.spacing(10)}px`
  }),
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  },
  button: {
    marginRight: '10px',
    paddingLeft: '10px',
    paddingRight: '10px',
    float: 'right'
  }
}))

export default function Terms() { 
  const classes = useStyles()
  const [terms, setTerms] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setTerms(data)
      }
    })

    return function cleanup(){
      abortController.abort()
    }
  }, [])

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        All Terms
        <Link to="/term/new">
          <Button variant="contained" color="primary"  className={classes.button}>
            <Icon style={{marginRight: '8px'}}>add_circle</Icon> 
            Add
          </Button>
        </Link>
      </Typography>
      <List dense>
        {terms.map((item, i) => {
        return <Link to={"/term/" + item.id} key={i}>
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar>
                        <AssignmentIcon/>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item.title}/>
                    <ListItemSecondaryAction>
                    <IconButton>
                        <ArrowForward/>
                    </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </Link>
              })
            }
      </List>
    </Paper>
  )
}

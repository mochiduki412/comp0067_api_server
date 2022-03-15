import React, {useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import FileUpload from '@material-ui/icons/AddPhotoAlternate'
import { makeStyles } from '@material-ui/core/styles'

import { create } from './api-term.js'


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle
  },
  info: {
    verticalAlign: 'middle'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  },
  input: {
    display: 'none'
  },
  button: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  filename:{
    marginLeft:'10px'
  },
  pictogram:{
    width: 260,
    height:150
  }
}))

export default function NewTerm({ match }) {
  const classes = useStyles()
  const [values, setValues] = useState({
    id: '',
    title: '',
    text: '',
    audio: '',
    pictogram: '',
    message: '',
    error: '',
    redirect: false
  })

  const handleChange = key => event => {
    let value
    if(key === 'audio' || key === 'pictogram'){
      value = event.target.files[0]
    } else{
      value = event.target.value
    }
    setValues({...values, [key]: value })
  }

  const clickSubmit = () => {
    let formData = new FormData()
    values.title && formData.append('title', values.title)
    values.text && formData.append('text', values.text)
    values.pictogram && formData.append('pictogram', values.pictogram)
    values.audio && formData.append('audio', values.audio)

    console.log('change: ', formData)
    create(formData).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, message: data.message, redirect: true}) //do not redirect for now.
      }
    })
  }

  if (values.redirect) {
    return (<Redirect to={'/term'}/>)
  }
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          Add a Term
        </Typography>
        <TextField id="title" label="Title" className={classes.textField} value={values.title} onChange={handleChange('title')} margin="normal"/><br/>
        <TextField
          id="multiline-flexible"
          label="Text"
          multiline
          rows="4"
          value={values.text}
          onChange={handleChange('text')}
          className={classes.textField}
          margin="normal"
        />
        <br/>

        {/* pictogram input */}
        <input accept="image/*" onChange={handleChange('pictogram')} className={classes.input} id="icon-button-pictogram" type="file" />
        <label htmlFor="icon-button-pictogram">
          <Button variant="contained" color="default" component="span" className={classes.button}>
            Upload Pictogram
            <FileUpload/>
          </Button>
        </label> <span className={classes.filename}>{values.pictogram ? values.pictogram.name : ''}</span>
        <br/>
        <br/>

        {/* audio input */}
        <input accept="audio/*" onChange={handleChange('audio')} className={classes.input} id="icon-button-audio" type="file" />
        <label htmlFor="icon-button-audio">
          <Button variant="contained" color="default" component="span" className={classes.button}>
            Upload Audio
            <FileUpload/>
          </Button>
        </label> <span className={classes.filename}>{values.audio ? values.audio.name : ''}</span><br/>

        {/* TODO: use pop-ups */}
        {/* info display */}
        {
          values.message && (<Typography component="p" color="primary">
            <Icon color="secondary" className={classes.info}>success</Icon><br/>
            {values.message}
          </Typography>)
        }

        {/* error display */}
        {
          values.error && (<Typography component="p" color="error">
            <Icon color="error" className={classes.info}>error</Icon><br/>
            {values.error}
          </Typography>)
        }
      </CardContent>
      <CardActions>
        <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
      </CardActions>
    </Card>
  )
}

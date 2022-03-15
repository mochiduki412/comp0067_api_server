import React, {useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom'
import ReactPlayer from "react-player"
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import FileUpload from '@material-ui/icons/AddPhotoAlternate'
import { makeStyles } from '@material-ui/core/styles'

import {read, update, remove} from './api-term.js'

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

export default function EditTerm({ match }) {
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

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read({
      id: match.params.id
    }, signal).then((data) => {
      if (data & data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, id: data.id, title: data.title, text: data.text})
      }
    })
    return function cleanup(){
      abortController.abort()
    }

  }, [match.params.id])
  
  const clickSubmit = () => {
    let formData = new FormData()
    values.title && formData.append('title', values.title)
    values.text && formData.append('text', values.text)
    values.pictogram && formData.append('pictogram', values.pictogram)
    values.audio && formData.append('audio', values.audio)

    update({
      id: match.params.id
    }, formData).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, message: data.message, redirect: false}) //do not redirect for now.
      }
    })
  }

  const clickDelete = () => {
    remove({
      id: match.params.id
    }).then((data) => {
      if (data & data.error) {
        setValues({...values, error: data.error})
      } else {
        //TODO: Create a pop-up before redirect
        setValues({redirect: true})
      }
    })
  }

  //TODO: Use the reduce hook.
  const handleChange = key => event => {
    let value
    if(key === 'audio' || key === 'pictogram'){
      value = event.target.files[0]
    } else{
      value = event.target.value
    }
    setValues({...values, [key]: value })
  }

  const showVideoError = e => {
    console.log('video error ', e)
  }

  if (values.redirect) {
    return (<Redirect to={'/term'}/>)
  }
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          Edit Terminology
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

        {/* TODO: possibly refactor to an Upload component later? */}
        {/* pictogram input */}
        <img src={'/api/terms/pictogram/' + values.id} alt="loading.." className={classes.pictogram}/><br/>
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
        <div style={{display: 'flex', justifyContent:'center'}}>
          <ReactPlayer
            url={'/api/terms/audio/' + values.id}
            width={'75%'}
            height='4rem'
            playing={false}
            controls={true}
            onError={showVideoError}
          />
        </div>
        <input accept="audio/*" onChange={handleChange('audio')} className={classes.input} id="icon-button-audio" type="file" />
        <label htmlFor="icon-button-audio">
          <Button variant="contained" color="default" component="span" className={classes.button}>
            Upload Audio
            <FileUpload/>
          </Button>
        </label> <span className={classes.filename}>{values.audio ? values.audio.name : ''}</span><br/>

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
        <Button color="secondary" variant="contained" onClick={clickDelete} className={classes.submit}>Delete</Button>
      </CardActions>
    </Card>
  )
}

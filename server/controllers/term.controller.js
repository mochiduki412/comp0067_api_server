import fs from 'fs'
import extend from 'lodash/extend'
import formidable from 'formidable'
import { ValidationError } from 'sequelize'

import Term from '../models/term.model'

const termByID = async (req, res, next, id) => {
  try {
    let term = await Term.findByPk(id)
    if (!term)
      return res.status('400').json({
        error: "Not found"
      })
    req.term = term
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve term"
    })
  }
}

const create = async (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log(err)
      return res.status(400).json({error: "Fail to create."})
    }

    try {
      let term = await Term.build(fields)
      if(files.pictogram) term.pictogram = fs.readFileSync(files.pictogram.filepath)
      if(files.audio) term.audio = fs.readFileSync(files.audio.filepath)
      term.save()
      res.json( _termToJson(term, 'Created.') )
    } catch (err) {
      console.log(err)
      return res.status(500).json({error: "Fail to create."})
    }
  })
}

const read = (req, res) => {
  return res.json( _termToJson(req.term) )
}

const list = async (req, res) => {
  try {
    let terms = await Term.findAll()
    res.json( terms.map( term => _termToJson(term) ) )
  } catch (err) {
    return res.status(400).json({
      error: err.message
    })
  }
}

const update = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.on('error', () => console.log(err) )
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log(err)
      return res.status(400).json({
        error: "Fail to update."
      })
    }

    let term = req.term
    term = extend(term, fields)
    term.updated = Date.now()
    if(files.pictogram){
      term.pictogram = fs.readFileSync(files.pictogram.filepath)
    }
    if(files.audio){
      term.audio = fs.readFileSync(files.audio.filepath)
    }
    
    try {
      await term.save()
      res.json( {
        ...term.toJSON(), 
        'audio': undefined, 
        'pictogram': undefined,
        message:'Updated.'
      } )
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  })
}

const remove = async (req, res) => {
  try {
    let term = req.term
    await term.destroy()
    res.json({...term.toJSON(), message: 'Deleted.'})
  } catch (err) {
    return res.status(400).json({
      error: err.message
    })
  }
}

const pictogram = (req, res) => {
  let term = req.term
  if(term.pictogram === null ){ //allow Null in DB for now
    console.log(`Request pictogram for ${term.title}, missing.`)
    return res.status(404).send({error: 'missing'})
  }
  res.set("Content-Type", 'image/png')
  return res.send( Buffer.from(term.pictogram, 'base64') )
}

const audio = (req, res) => {
  let term = req.term
  if(term.audio === null ){ //allow Null in DB for now
    console.log(`Request audio for ${term.title}, missing.`)
    return res.status(404).send({error: 'missing'})
  }
  res.set("Content-Type", 'audio/mpeg')
  return res.send( Buffer.from(term.audio, 'base64') )
}

const _termToJson = (term, msg, err) => {
  let res = {...term.toJSON(), 'audio': undefined, 'pictogram': undefined}
  if (msg !== undefined) res.message = msg
  if (err !== undefined) res.error = err
  return res
}

export default {
  create,
  termByID,
  read,
  list,
  remove,
  update,
  pictogram,
  audio
}

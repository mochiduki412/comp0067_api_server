import express from 'express'
import termCtrl from '../controllers/term.controller'

const router = express.Router()

router.route('/api/terms')
  .get(termCtrl.list)
  .post(termCtrl.create)

//TODO: Fix the routing for exact match
router.route('/api/terms/:termId')
  .get(termCtrl.read)
  .put(termCtrl.update)
  .delete(termCtrl.remove)

router.route('/api/terms/audio/:termId')
  .get(termCtrl.audio)

router.route('/api/terms/pictogram/:termId')
  .get(termCtrl.pictogram)

router.param('termId', termCtrl.termByID)

export default router

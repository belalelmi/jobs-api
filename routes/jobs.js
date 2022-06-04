import { Router } from 'express'
const router = Router()

import {
  getAllJobs,
  getJob,
  deleteJob,
  updateJob,
  createJob,
} from '../controllers/jobs.js'

router.route('/').post(createJob).get(getAllJobs)
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob)

export default router

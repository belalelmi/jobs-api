import { Router } from 'express'
import { login, register } from '../controllers/auth.js'

const router = Router()

router.route('/register').post(register)
router.route('/login').post(login)

// router.post('/register', register)
// router.post('/login', login)

export default router

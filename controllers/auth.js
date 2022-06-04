import User from '../models/User.js'
import StatusCodes from 'http-status-codes'

const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  req.status(StatusCodes.CREATED).json(user)
  // req.status(StatusCodes.CREATED).json({ user })
}

const login = async (req, res) => {
  res.send('login user')
}

export { register, login }

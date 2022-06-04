import mongoose from 'mongoose'
// import bcrypt from 'bcryptjs'

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please fill a valid email address',
    ],
    unique: true,
  }, // email must be unique
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    maxlength: 50,
    select: false,
  },
})

export default mongoose.model('User', UserSchema)

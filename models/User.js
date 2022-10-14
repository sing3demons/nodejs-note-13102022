const { Schema, model } = require('mongoose')
const { genSalt, hash, compare } = require('bcrypt')

const userSchema = new Schema(
  {
    fistName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    password: { type: String, required: true },
    role: { type: String, enum: ['member', 'admin'], default: 'member' },
  },
  { collection: 'users', timestamps: true }
)

userSchema.methods.encryptPassword = async (password) => {
  const salt = await genSalt(12)
  return await hash(password, salt)
}

userSchema.methods.checkPassword = async function (password) {
  const isValid = await compare(password, this.password)
  return isValid
}

userSchema.methods.fullName = `${this.fistName} ${this.lastName}`

const User = model('User', userSchema)
module.exports = User

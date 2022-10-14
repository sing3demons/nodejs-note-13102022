const { model, Schema } = require('mongoose')
const userSchema = new Schema(
  {
    name: { type: String, required: true },
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
  {
    timestamps: true,
  }
)

const User = model('User', userSchema)
module.exports = User

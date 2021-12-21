import { Schema, Document, Model, model } from 'mongoose'

interface UserDocument extends Document {
    username: string
    slug: string
    email: string
    password: string
}

const UserSchema: Schema<UserDocument> = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

const User: Model<UserDocument> = model('User', UserSchema)

export default User

import mongoose from 'mongoose'

const database = async () => {
    const dbURI = 'mongodb://localhost:27017/project-manager'
    try {
        await mongoose.connect(dbURI)
    } catch (e) {
        throw e
    }
}

export default database

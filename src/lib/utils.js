const { default: mongoose } = require("mongoose")

export const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
    } catch(error) {
        console.log(error) 
        throw new Error("failed to fect database")
    }
}
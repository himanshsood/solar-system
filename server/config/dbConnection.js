const mongoose=require("mongoose")

const connectDb=async()=>{
    try {
        const connect=mongoose
        .connect('mongodb+srv://harmeet96:U75SYB05AWP1@cluster0.0elap.mongodb.net/', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.log(err));
      
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDb;
import mongoose from 'mongoose'

const ConnectToDB = async () => {
  try{
    await mongoose.connect('mongodb+srv://adexterity:adexterity@cluster0.fsrvtjs.mongodb.net/')
    console.log('mongodb connected successfully')
  }
  catch(e){
    console.log(e)
  }
}

export default ConnectToDB;


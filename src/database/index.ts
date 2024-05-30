import mongoose from 'mongoose'

const ConnectToDB = async () => {
  try{
    await mongoose.connect('mongodb+srv://opensesame4me:oE5AK8QTnWW3Scsf@cluster0.r9oftu0.mongodb.net/')

    //mongodb+srv://adexterity:<password>@cluster0.fsrvtjs.mongodb.net/



    console.log('mongodb connected successfully')
  }
  catch(e){
    console.log(e)
  }
}

export default ConnectToDB;




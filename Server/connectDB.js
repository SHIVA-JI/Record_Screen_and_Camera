import { MongoClient} from "mongodb";
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export async function connectToDatabase() {
  try {
    // Connect to MongoDB Atlas
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    return 1;
  } catch (err) {
    console.error('Error connecting to MongoDB Atlas:', err);
    return 0;
  }
}

const db = client.db('Recorder');
const collect = db.collection('reorder');

export const createDocument = async (firstName,lastName,email,password) => {
    try{
      const userData = ({
        firstName : firstName,
        lastName: lastName,
        email: email,
        password: password
    })

    const result  = await collect.insertOne(userData);
    // return result;
    return true;
    // console.log(result);
  }
  catch(err){
    console.log(err);
    return false;
  }
}

export const findDocument = async (email) => {
  try{
    const result = await collect.findOne({email});
    return result;
  }
  catch(err){
    console.log(err);
  }
}
  
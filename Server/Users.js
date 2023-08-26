
import { connectToDatabase,createDocument,findDocument } from './connectDB.js';

import cors from 'cors';
import express from 'express';

import bodyParser from 'body-parser';

import jwt from 'jsonwebtoken';


const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY

app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(bodyParser.json());

connectToDatabase();
app.post('/signup', async (req, res) => {
  const { firstName,lastName, email, password , cpassword } = req.body;
  try{
    const checkUser = await findDocument(email) ;
    if( checkUser && checkUser.email === email){
      res.status(500).json({ success: false, message: `Account with given email '${email}' already exist.` });
    }
    else if(password == cpassword) {
      const newToken = jwt.sign(password,SECRET_KEY);
      const createResult = await createDocument(firstName,lastName, email, newToken);
      if(createResult) {
        res.json({ success: true, message: `Congrtas ${firstName}, You have signed up.` });
      }
      else{
        res.status(500).json({ success: false, message: 'Database Error' });
      }
    }
    else{
      res.status(500).json({ success: false, message: 'Both password must be same' });
    }

  }
  catch(error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Signup failed' });
  }
});

app.post('/login', async (req , res) => {
  const {email,password} = req.body;
  try{
    const logResult = await findDocument(email);
    const logToken = jwt.sign(password,SECRET_KEY);
    if(logResult){
      if(logResult.password === logToken){
        res.json({ success: true, message: 'Signup successful' });
      }
      else {
        res.status(500).json({ success: false, message: 'Inavalid Password' });
      }
    }
    else{
      res.status(500).json({ success: false, message: 'Inavalid Email' });
    }
  } 
  catch(error) {
    console.log(error);
  }
}); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


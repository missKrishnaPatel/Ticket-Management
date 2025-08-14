// import User from "../models/Admin";
import Admin from "../models/Admin.js"

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();


const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;


export const register  = async(req, res) =>{
    const{name, email,password} = req.body;


    try{
        let user = await Admin.findOne({ email });
        if(user) return res.status(400).json({msg:"User already exists"});


        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Admin({name, email, password: hashedPassword});

        await newUser.save();



        res.status(201).json({msg: "User registered successfully"});



    } catch(error){
        res.status(500).json({msg: "Server error"});
    }


};



export const login = async (req,res) => {

    const{email, password} = req.body;


    try{

        if(email === ADMIN_EMAIL){
            if(password === ADMIN_PASSWORD){
                const token = jwt.sign({ role: "admin", email},process.env.JWT_SECRET,{expiresIn:"1h",});


                return res.json({
                    token,
user:{
    name:"Admin",
    email:ADMIN_EMAIL,
    role:"admin",
},
                })
             } else{
                    return res.status(401).json({msg:"Invalid admin credentials"});
                }
            
        }




 const user = await Admin.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid user credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid user credentials" });

    const token = jwt.sign({ id: user._id, role: "user" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: "user",
      },
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });


    }
    
}
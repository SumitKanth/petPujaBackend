import { User } from "../models/user.js";
import bcrypt from 'bcrypt';
import { setCookie, userExistOrNot } from "../utils/features.js";

// Creating User
export const createUser = async (req, res) => {
    const {name, number, email, password} = req.body;
    
    let user = await User.findOne({number});
    
    // If user Exist
    if(user)
       return userExistOrNot(res, "User Allready Exist")
    
    // if user did'not exist
    const hashedPass = await bcrypt.hash(password, 10);
    user = await User.create({name, number, email, password: hashedPass});  
    
    setCookie(user, res, "User Created", 201);
}

// Login User
export const loginUser = async (req, res) => {
    const {number, email, password} = req.body;

    let user = await User.findOne({number});
    if(!user) 
       return userExistOrNot(res, "Given data is wrong");
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(user.email != email || !passwordMatch)
        return userExistOrNot(res, "Given data is wrong");

    setCookie(user, res, `${user.name} welcome back 😊`, 200);
}

// Logout User
export const logoutUser = async (req, res) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: "strict",
        secure: true,
    }
    
    ).json({
        success: true,
        message: `Logout Successfully`
    })

}
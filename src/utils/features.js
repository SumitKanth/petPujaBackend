import jwt from "jsonwebtoken";

export const setCookie = (user, res, message, status=200) => {
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '15m'});
    
    res.status(201).cookie("token", token, {
        httpOnly: true,
        maxAge: 15*60*1000,
        sameSite: 'strict',
        secure: true,
    }).json({
        success: true,
        message: message
    })
}

export const userExistOrNot = (res, message) => {
    res.status(501).json({
        success: false,
        message: message
    })
}
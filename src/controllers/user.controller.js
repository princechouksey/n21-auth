const userModel = require('../models/user.model')
const postModel = require('../models/post.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
module.exports.viewRegisterController = (req,res)=>{
    res.render('register');
}
module.exports.registerUserController = async(req,res)=>{
    const { username ,password, email, imageUrl} = req.body
    const hashedPassword =await  bcrypt.hash(password,10);
    const user  = await userModel.create({
        username,
        password: hashedPassword,
        email,
        imageUrl
    })
    const token = jwt.sign({
        id: user._id,
        email:user.email
    },"secret-key")
    res.cookie('token', token)
    res.status(201).json({
        user, token
    })
}
module.exports.viewLoginController  =(req,res)=>{
    res.render('login');
}
module.exports.loginUserController  = async(req,res)=>{
    const {email, password } = req.body;
    const isUserExist = await userModel.findOne({email})
    if(!isUserExist){
        return res.status(400).json({error: "User not found"})
    }
    const isPasswordMatch = await bcrypt.compare(password, isUserExist.password);
    if(!isPasswordMatch){
        return res.status(400).json({error: "Invalid credentials"})
    }
    const token = jwt.sign({
        id: isUserExist._id,
        email:isUserExist.email
    },"secret-key")
    res.cookie('token', token)
    res.status(200).json({
        isUserExist, token
    })

}
module.exports.viewFeedsController = async (req,res)=>{
    const posts = await postModel.find().populate('author');
    res.render('feed', {posts});
}
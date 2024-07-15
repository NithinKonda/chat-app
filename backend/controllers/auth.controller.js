import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js";





export const signup = async (req,res) =>
    {
        const {fullName,username,password,confirmPassword,gender} = req.body;
        if (password !== confirmPassword)
            {
                return res.status(400).json({error:"Password do not match"})
            }
            const user = await User.findOne({username})
        if (user)
            {
                return res.status(400).json({error:"Username already exists"})
            }

            
        const salt = await bcrypt.genSalt(10);
        const hashedPassword= bcrypt.hash(password,salt)
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=$(username)`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=$(username)`



        const newUser= new User({
            fullName,
            username,
            password,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })


        generateTokenAndSetCookie(newUser._id,res)
        await newUser.save();

        res.status(201).json({
            _id:newUser.id,
            fullName: newUser.fullName,
            username: newUser.username,
            gender: newUser.gender,
        })

    }


export const login = async (req,res) =>
    {
        try {
            const {username,password} = req.body
            const user = await User.findOne({username})
            const isPassword= await bcrypt.compare(password,user?.password || "")
            if(password != user.password)
                {
                    return res.status(400).json({error:"invalid username and password"})
                }
            generateTokenAndSetCookie(user._id,res)
            res.status(200).json({
                _id:user._id,
                fullName:user.fullName,
                username:user.username,
                gender:user.gender,
                profilePic: user.profilePic

            })
        } 
        catch (error) 
        {
            console.log("error in login controller", error.message)
            res.status(500).json({error:"internal server error"})
        }

    }


export const logout = (req,res) =>
    {
        try 
        {
            res.cookie("jwt","",{maxAge:0})
            res.status(200).json({message:"Logged out successfully"})
            
        } catch (error) {
            console.log("error in logout controller", error.message)
            res.status(500).json({error:"internal server error"})
        }
    }


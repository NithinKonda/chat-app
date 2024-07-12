import User from "../models/user.model.js"

export const getUserForSidebar = async (req,res) =>
{
    try {

        const logedInUser = req.user._id

        const filteredUser = await User.find({_id:{$ne : logedInUser}}).select("-password")

        res.status(200).json(filteredUser)
        
    } catch (error) {
        console.log("error in getting user in sidebar",error.message)
        res.status(500).json({error:"INTERNAL SERVER ERROR"})
    }
}
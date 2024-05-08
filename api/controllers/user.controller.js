import User from "../models/auth.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'

export const updateUser = async(req, res, next) =>{
    if(req.user.id !== req.params.userId){
        return next(errorHandler(500, 'You are not allowed to update this user'))
    }
    try {
        if(req.body.password){
            if(req.body.password < 6){
                return next(errorHandler(500, 'Password must be at least 6 characters'));
            }
        }
         req.body.password = bcryptjs.hashSync(req.body.password, 10)
        if(req.body.username){
            if(req.body.username !== req.body.username.toLowerCase()){
                return next(errorHandler(403, 'Username must be lowercase'))
            }
            if(req.body.username < 7 && req.body.username > 20){
                return next(errorHandler(403, 'Username must be between 7 and 20 characters'))
            }
            if(!req.body.username.match(/^[a-zA-Z0-9]/g)){
                return next(errorHandler(403, 'Username must must contain only letters and numbers'))
            }
            if(req.body.username.includes(' ')){
                return next(errorHandler(403, 'Username must not contain spaces'))
            }
        }
        const updated = await User.findByIdAndUpdate(req.params.userId,{
            $set:{
                username: req.body.username,
                email: req.body.email,
                profilePicture: req.body.profilePicture,
                password: req.body.password
            }
        }, {new: true})
        const {password, ...rest} = updated._doc
        res.status(200).json(rest)
        
    } catch (error) {
        next(error)
    }
}
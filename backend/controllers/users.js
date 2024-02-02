const User = require('../model/usermodel');
const bcrypt = require('bcryptjs')

const login = async(req,res,next) =>{
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user)
          return res.json({ msg: "Incorrect Username or Password", status: false });

        //checking password with the correct password  
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
          return res.json({ msg: "Incorrect Username or Password", status: false });
        delete user.password;
        return res.json({ status: true, user });
      } catch (ex) {
        next(ex);
      }
}
const getAllUsers = async(req,res,next) =>{
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
          "email",
          "username",
          "avatarImage",
          "_id",
        ]);
        return res.json(users);
      } catch (ex) {
        next(ex);
      }
}
// const setAvatar = async(req,res,next) =>{
//     try {
//         const userId = req.params.id;
//         const avatarImage = req.body.image;
//         const userData = await User.findByIdAndUpdate(
//           userId,
//           {
//             isAvatarImageSet: true,
//             avatarImage,
//           },
//           { new: true }
//         );
//         return res.json({
//           isSet: userData.isAvatarImageSet,
//           image: userData.avatarImage,
//         });
//       } catch (ex) {
//         next(ex);
//       }
// }
const register = async(req,res,next)=>{
    try {
        const { username, email, password } = req.body

  const usernameCheck = await User.findOne({username});
  if(usernameCheck)
    return res.json({msg:"Username already used",status:false})
  const emailCheck = await User.findOne({email});
  if(emailCheck)
    return res.json({msg:"Email already used",status:false})

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)  
    
  // Create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  })
  delete user.password;
  return res.json({status:true,user})

        
    } catch (error) {
        next(error);
    }
    
    
}

const getUserbyid = async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({user})
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

const editUser = async(req,res)=>{
    const editUser = req.body;
    const newUser = new User(editUser);
    if(!newUser){
        return res.status(404).json({ msg: error.message })
    }//checking if all the details are according to the schema
    try {
        await User.updateOne({_id:req.params.id},editUser)
        res.status(200).json({ msg:"User updated"})
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}
//very important to see that we have to passs the req.body in updateOne,if we pass newUser
//it will give id is immutable and cannot be changed 
//when we pass the req.body it takes the id also hence id remains same while in newUser case we are changign the id

const  logout= async(req,res,next)=>{
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
}

module.exports = {login,register,getAllUsers,editUser,logout} 


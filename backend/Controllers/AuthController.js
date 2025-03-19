import User from "../Models/User.js";
import bcrypt from "bcryptjs"; // If not installed, run: npm install bcryptjs
import jwt from "jsonwebtoken";


const signup = async (req, res) => {
try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email }); // Change UserModel to User
    if(user){
        return res.status(409)
        .json({message: 'user is already exist, you can login', success:false });
    }
    const newUser = new User({ name, email, password });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();
    
    res.status(201)
    .json({message: "signup successfully",
        success:true
    })
} catch (error) {
    res.status(500)
    .json({
        message: "Internal server error",
        success: false
    })
}
}

const login = async (req, res) => {
try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }); // Change UserModel to User
    const errorMsg = 'Auth failed email or password is wrong';
    if(!user){
        return res.status(403)
        .json({message: errorMsg, success:false });
    }
    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if(!isPasswordEqual){
        return res.status(403)
            .json({ message: errorMsg, success: false });
    }
    const jwtToken = jwt.sign(
        { email: user.email, _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' },
    )
    
    res.status(200)
    .json({message: "login success",
        success:true,
        jwtToken,
        email,
        name: user.name
    })
} catch (error) {
    res.status(500)
    .json({
        message: "Internal server error",
        success: false
    })
    
}
}

export { signup, login }; // ✅ Named export instead of default

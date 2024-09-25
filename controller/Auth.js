import Usermodel from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();


export const registerUser = async(req,res)=>{
    try{
       const{name,email,password,image} =req.body;

       if(!name || !email || !password ){
        return res.status(400).json({message:"Please enetr all fields"});
       }
       const isEmailExisted = await Usermodel.findOne({email});
       if(isEmailExisted){
        return res.status(400).json({message:"Email already exits"});
       }
       //hasing password
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password, salt);

       const user = new Usermodel({name, email, password: hashedPassword, image:req.file.path});
       // const user = new Usermodel({name, email, password: hashedPassword , image:req.file.path});
       await user.save();
       res.status(201).json({
       user,
       message:"user successfully",
       success:true
       });

    }catch(error){
        res.status(400).json({message:error.message});
    }
};

export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Please enter all fields" });
      }
      const user = await Usermodel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    // jwt
      const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: "1d" });

      res.status(200).json({
        message: "User logged in successfully",
        success: true,
        data: user,
        token: token,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  //LOGOUT
  export const logoutUser = async (req, res) => {
    try {
      // Remove the token from the request
      req.token = null;
      // Destroy the session (if using sessions)
      req.session.destroy();
      res.status(200).json({ message: "User logged out successfully", success: true });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  //forget password

  // Configure Nodemailer
/*const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use your email service provider
  auth: {
    user: "zn08977@gmail.com",
    pass: "zain#@34",
  },
});

// Handle Forgot Password Request
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Please enter your email' });
    }

    const user = await Usermodel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User with this email does not exist' });
    }

    // Generate a reset token
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    //user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    // Create the reset link
    const resetLink = `http://localhost:3000/reset-password/${token}`;

    // Send the email
    const mailOptions = {
      from: "zn08977@gmail.com",
      to: email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Click on the following link to reset your password: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error sending email' });
      }
      res.status(200).json({ message: 'Password reset email sent' });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};*/

//------------------------------------------
async function sendEmail({to,html}) {
  
  let transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: 'nr791609@gmail.com',
      pass: 'Nadeem32!',
    },
    tls: {
      ciphers: 'SSLv3'
    },
    connectionTimeout: 60000 // Increase timeout to 60 seconds
  });
console.log(to)
  // Mail options
  let mailOptions = {
      from: "nr791609@gmail.com", // Sender address
      to,
      subject:"Update Password Verification COde",
      html:html
    
   };
  // Send mail with defined transport object
  try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully.');
  } catch (error) {
      console.error('Error sending email:', error);
  }
}

  
// Forgot Password - Send OTP
export const forgotPassword = async (req, res) => {
  try {
     
      const userFromToken = req.user;  
console.log(userFromToken)
      const { email } = req.body;
      const emailToUse = email 
console.log(emailToUse,"email")

      if (!emailToUse) {
          return res.status(400).json({ message: "Please enter your email" });
      }

      // Check if user exists with that email
      const user = await Usermodel.findOne({ email: emailToUse });
      if (!user) {
          return res.status(404).json({ message: "User with this email does not exist" });
      }

      // Generate a random 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000);
      const otpExpiration = Date.now() + 15 * 60 * 1000;
   
      // Save OTP and expiration in user data
      user.resetPasswordToken = otp;
      user.resetPasswordExpire = otpExpiration;
      await user.save();
console.log(emailToUse)

const htmlContent = '<p>Your OTP for resetting your password is <strong>' + otp + '</strong>. It is valid for 15 minutes.</p>';

await sendEmail({to:emailToUse,html:htmlContent});
   

      return res.status(200).json({
          message: "OTP sent to email. Please check your inbox.",
          success: true
      });
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
};
// Reset Password with OTP
export const resetPassword = async (req, res) => {
  try {
   
      const userFromToken = req.user;  
      console.log('User from token:', userFromToken);

      const { email, otp, newPassword } = req.body;
      const emailToUse = email || (userFromToken && userFromToken.email);
      console.log('Email:', emailToUse);
      console.log('OTP:', otp);
      console.log('New Password:', newPassword);

      if (!emailToUse || !otp || !newPassword) {
          return res.status(400).json({ message: "Please provide all required fields" });
      }

      // Check if user exists
      const user = await Usermodel.findOne({ email: emailToUse });
      if (!user) {
          return res.status(404).json({ message: "User with this email does not exist" });
      }

      // Check if OTP is valid and not expired
      if (user.resetPasswordToken !== otp || Date.now() > user.resetPasswordExpire) {
          return res.status(400).json({ message: "Invalid or expired OTP" });
      }

      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update the user's password and clear OTP
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      return res.status(200).json({
          message: "Password reset successfully",
          success: true
      });
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
};

 
  


  




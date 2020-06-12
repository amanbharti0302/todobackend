const crypto = require('crypto');
const bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');

const catchAsync = require('../utils/catchAsync');
const User = require('../schema/userschema');
const AppError = require('../utils/appError');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.email,
		pass: process.env.password
	}
});



exports.signup = catchAsync(async (req, res, next) => {
 
  const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 12)
    });
  
    const resetToken = newUser.createPasswordResetToken();
    newUser.save();
    const resetURL = `${req.protocol}://${req.get('host')}/auth/verifyemail/${resetToken}`;
    
    const mailOptions = {
			from: process.env.email,
			to: newUser.email,
			subject: 'Email verification for todo list',
			html: `<a href="${resetURL}" >${resetURL}</a>`
    };
    
		transporter.sendMail(mailOptions, async (err, info)=> {
			if (err)
      { await User.findOneAndDelete({email:req.body.email});
        return next(new AppError('There is something wrong with this email', 404));
      }
      else 
        {
          res.status(200).json({
            status:'success',
            message:'please check your email to verify'
          });
        }
    });
  });


exports.login = catchAsync(async(req,res,next)=>{
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError('Please provide email and password!', 400));
    }
    const user = await User.findOne({ email }).select('+password');
    if(!user){
      return next(new AppError('Email or password is wrong', 400));
    }
    else if(!user.active){
      return next(new AppError('Email is not verified either verify it from your email or go to reset password to verify', 400));
    }
    else{
      res.status(200).json({
        status:'success',
        user:user
      });
    }

  })

  exports.verifyemail = catchAsync(async (req, res) => {
      const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');
      const user = await User.findOne({ passwordResetToken: hashedToken });
      if (!user) {
        res.send('<html><head><title>Email verification</title></head><body bgcolor="white"><center><h1>Email not veified</h1></center><hr><center>covid19pr.com</center></body></html>');
      }
      else {
        user.active = true;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();
        res.send('<html><head><title>Email verification</title></head><body bgcolor="white"><center><h1>Email veified</h1></center><hr><center>covid19pr.com</center></body></html>');
      }
  })
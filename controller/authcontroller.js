const catchAsync = require('../utils/catchAsync');


exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm
    });
  
    // const url = `${req.protocol}://${req.get('host')}/me`;
    // // console.log(url);
    // await new Email(newUser, url).sendWelcome();
  
    // createSendToken(newUser, 201, req, res);
  });


  exports.login = catchAsync(async(req,res,next)=>{
    const { email, password } = req.body;
    // if (!email || !password) {
    //   return next(new AppError('Please provide email and password!', 400));
    // }
    // const user = await User.findOne({ email }).select('+password');
  })
const catchAsync = require('../utils/catchAsync');
const project = require('../schema/todoschema');
const AppError = require('../utils/appError');
const { json } = require('body-parser');


exports.createnew = catchAsync(async(req,res,next)=>{
    const newproject = await project.create(req.body);
    res.status(200).json({
        status:"success",
        project:newproject
    });
  })

exports.updateproject = catchAsync(async(req,res,next)=>{
    const myproject =await project.findByIdAndUpdate(req.body);
    myproject.access = req.body.access;
    myproject.doing = req.body.doing;
    myproject.todo = req.body.todo;
    myproject.done = req.body.done;
    myproject.save();

    res.status(200).json({
        status:"success",
        project:myproject
    });
  })

exports.deleteproject = catchAsync(async(req,res,next)=>{
    const myproject =await project.findOneAndDelete(req.body);

    res.status(200).json({
        status:"success",
        project:myproject
    });
  })

  exports.getproject = catchAsync(async(req,res,next)=>{
   
    let myprojectid=[];
    var myproject=[];
    myprojectid = req.body.projectid;

    for(let i=0;i<myprojectid.length;i++){
      myproject.push(await project.findById({_id:myprojectid[i]}))
    }

    res.status(200).json({
        status:"success",
        project:myproject
    });
  })

  exports.getoneprojectdetail = catchAsync(async(req,res,next)=>{
    const projectid=req.body.projectid;
    const currentUser= req.body.currentUser;

    const currentproject =await project.findOne({_id:projectid,access:currentUser._id});

    if(!currentproject[0]){
      return next(new AppError('Unauthorised access',400));
    }

    res.status(200).json({
      status:"success",
      project:currentproject
  });

  })
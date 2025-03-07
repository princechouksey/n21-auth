const postModel = require('../models/post.model')
module.exports.viewPostController = (req,res)=>{
    res.render('create-post')
}
module.exports.createPostController = async(req,res)=>{
   const {media, caption} = req.body;
  const post =await  postModel.create({
    media,
    caption,
    author:req.user.id

  })
  res.send(post)
  res.render('/user/feed')
}


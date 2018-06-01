var express = require('express');
var router = express.Router();
var User = require('../models/User');// 引入模型
var Songs = require('../models/Song');// 引入模型

/* GET home page. */
router.get('/', function(req, res, next) {
    User.find({},(err, docs)=>{
        if(err){
            res.send('server or db error');
        }else{
            if(req.cookies.user){
                res.render('index', { users: docs,user:req.cookies.user });
            }else{
                res.render("login");
            }
        }
    })

});

router.get('/login', function(req, res, next) {
    res.render("login");
});

router.get('/register', function(req, res, next) {
    res.render("register");
});

router.post('/add', function(req, res) {
    var name = req.body.username;
    var user = new User({
      username:name,
      password:req.body.password
  });
  user.save((err)=>{ //添加
    console.log('save status:', err ? 'failed' : 'success');
  });
  res.json({code:200,message:"注册成功"});
});

router.get("/find",function (req,res) {
    User.find({},(err, docs)=>{
        if(err){
            res.send('server or db error');
        }else{
            console.log('登录成功用户：'+docs);
            if(docs.length==0){
                res.send('用户名或密码有误');
            }else{
                res.json({code:200,data:docs,message:"登录成功"});
            }
        }
    })
})

router.post("/findOne",function (req,res) {
    var filterJson = {username:req.body.username};
    req.body.password && (filterJson.password = req.body.password);
    User.findOne(filterJson,(err, doc)=>{
        if(err){
            res.send('server or db error');
        }else{
            console.log('登录成功用户：'+doc);
            if(doc==null){
                res.json({code:400,message:"登录失败,账号密码错误！"});
            }else{
                req.session.user = filterJson;
                res.cookie("user", filterJson, {maxAge: 60000*60});
                res.json({code:200,message:"登录成功"});
            }
        }
    })
})

router.post("/update",function (req,res) {
    User.update({username: req.body.username},{username:req.body.newName},function (err) {
        if(err){

        }else{
            res.json({code:200,message:"修改成功"});
        }
    })
})

router.post("/remove",function (req,res) {
    User.remove({username: req.body.username},function (err) {
        if(err){

        }else{
            res.json({code:200,message:"删除成功"});
        }
    })
})

router.get("/logout",function (req,res) {
    delete req.session.user;
    res.render("login");
})

module.exports = router;

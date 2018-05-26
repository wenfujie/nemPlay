var express = require('express');
var router = express.Router();
var User = require('../models/User');// 引入模型

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/add', function(req, res) {
    var user = new User({
      username:'wenfujie',
      password:'123'
  });
  user.save((err)=>{ //添加
    console.log('save status:', err ? 'failed' : 'success');
  });
  console.log("=-=-=-==-=-=-添加成功")
});

module.exports = router;

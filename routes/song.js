var express = require('express');
var router = express.Router();
var Song = require('../models/Song');// 引入模型
var fs = require('fs');

router.get('/', function(req, res, next) {
    Song.find({},(err,data)=>{
        if(!err){
            res.render("music",{songs:data});
        }else{
            res.send(404);
        }
    })
});

router.get("/getAllSongs",function (req,res,next) {
    Song.find({},(err,data)=>{
        if(!err){
            res.json({code:200,data:data,message:"查找所有歌曲成功"});
        }else{
            res.send(404);
        }
    })
})

// 上传文件
router.post("/file-upload",function (req,res) {
    // 获得文件的临时路径
    var tmp_path = req.files.thumbnail.path;
    // 指定文件上传后的目录 - 示例为"images"目录。
    var target_path = './public/music/' + req.files.thumbnail.name;
    var save_path = "127.0.0.1:3000/music/" + req.files.thumbnail.name;
    console.log(req.files.thumbnail,"=========")
    // 移动文件
    fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        var song = new Song({
            songName: req.files.thumbnail.originalname,
            songCodeName: req.files.thumbnail.name,
            songTime: req.files.thumbnail.size,
            singer: req.body.singer,
            songUrl: save_path
        })
        song.save((err)=>{
            if(!err){
                res.redirect("/music");
            }else{
                res.send("404");
            }
        });
    });
})

router.get("/findAllSong",function (req,res,next) {
    Song.find({},(err,data)=>{
        res.json({code:200,data:data,message:"查找成功"});
    })
})

module.exports = router;
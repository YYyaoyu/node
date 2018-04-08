var user=require("../models/user/user");
var dbHelper=require("../config/dbHelper");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
module.exports = function ( app ) {

    app.get("/rgt",function(req,res){
        res.render("rgt");
    });
    app.post("/register",urlencodedParser,function(req,res){
		dbHelper.model("user").createTable(new user().fields);
		dbHelper.model("user").insert(req.body);
    	res.send(req.body);
    });
    app.post("/login",urlencodedParser,function(req,res){

    	if(req.body.username == 'admin' && req.body.password == 'admin123'){
            res.send({msg:true});
            req.session.userName = req.body.username; // 登录成功，设置 session
            res.redirect('/');
        }
        else{
        	//res.redirect("/goodsdetail");
            res.send({msg : false});// 若登录失败，重定向到登录页面
        }
    })
}

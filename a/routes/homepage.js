var dbHelper=require("../config/dbHelper");
module.exports=function(app){
	app.get("/index",function(req,res){
		res.render("homepage");
	})
	app.get("/getgoodslist",function(req,res){

		dbHelper.model("goods").find("",function(err,result){

			res.send(result);
		})

	})

}


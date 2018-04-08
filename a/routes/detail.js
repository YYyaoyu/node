var dbHelper=require("../config/dbHelper");
module.exports=function(app){

	app.get("/goodsdetail",function(req,res){

        dbHelper.model("goods").find(req.query.id,function(err,result1){
		dbHelper.model("assess").find(req.query.id,function(err,result2){
        	res.render("goodsdetail",
        		{title:result1[0].title,
        	     price:result1[0].price,
        	     orgprice:result1[0].orgprice,
        	     assessnum:result1[0].assessnum,
        	     sellnum:result1[0].sellnum,
        	     stocknum:result1[0].stocknum,
        	     bigimg:result1[0].img,
        	     smallimg:result1[0].imgs.split(","),
        	     assess:result2}
        	);       

		})    
 	
        })
    

	})
	app.get("/getgoodsdetail",function(req,res){
		dbHelper.model("goods").find(req.query.id,function(err,result){

			res.send(result);
		})
	})
	app.get("/getassess",function(req,res){

		dbHelper.model("assess").find(req.query.id,function(err,result){

			res.send(result);
		})

	})

}


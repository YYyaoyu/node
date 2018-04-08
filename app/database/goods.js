var mysql=require('mysql');
var fs=require("fs");
const assess=require("../assess");
const detail=require("../detail");
var db=require('../config/database');

module.exports=function(filename){

	fs.readFile("/app/data/"+filename,'utf-8', function(err,data){ 
	
		if(err){ 
			console.log(err); 
		}else{ 
			readGoods(data); 
		} 
	})
}
function readGoods(data){
	var reg=/\([^\)]*\)/;
	data=JSON.parse(data.match(reg)[0].replace("\(","").replace("\)",""))
	     .result.wall.docs;
   
    var goodsList=[];
    for(var i in data){
    	goodsList[i]=[];
    	goodsList[i].push(data[i].tradeItemId);
    	goodsList[i].push(data[i].title);
    	goodsList[i].push(data[i].price);
    	goodsList[i].push(data[i].orgPrice);
    	goodsList[i].push(data[i].cfav);
    	goodsList[i].push(data[i].img);

    }
    insertGoods(goodsList);

}

function insertGoods(data){

    db.pool.getConnection(function(err, connection) {
        if (err) {
            return;
        }
        connection.query(
        	"DROP TABLE IF EXISTS `goods`;",
        	function(err,result){
        		if(err){throw err}
        			else{
        				console.log("删除表成功")
        			}
        		});
        connection.query(
        	"CREATE TABLE goods(id varchar(255),title varchar(255),price float,orgprice float,cfav int,img varchar(255))",
        	function(err,result){
        		if(err){throw err}
        			else{
        				console.log("创建表成功")
        			}
        		});
        var  goodsAddSql = 'INSERT INTO goods VALUES ?';

        var  goodsAddSql_Params = data;

        connection.query(goodsAddSql,[goodsAddSql_Params],function (err, result) {

        	if(err){

        		console.log('[INSERT ERROR] - ',err.message);

        		return;

        	}       

        	console.log('牛逼了');
            assess();
            detail();
        });
        connection.release();

    });	

	
}

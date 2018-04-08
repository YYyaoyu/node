var mysql=require('mysql');
var fs=require("fs");
const cheerio=require("cheerio");
var db=require('../config/database');

module.exports=function(filename){

    var reg=/\-[^\)]*\./;
	fs.readFile("/app/data/"+filename,'utf-8', function(err,data){ 
	
		if(err){ 
			console.log(err); 
		}else{ 
			readGoods(data,filename);

		} 
	})
}

function readGoods(data,filename){
	var result=[];
	var $ = cheerio.load(data, {decodeEntities: false});
			//var reg=/var\s*detailInfo\s*=\s*{([\s\S]*?)}/;
	var reg=/\s*topImages:([\s\S]*?])/;
			//console.log(data.match(reg))
			//console.log($('script[type="text/javascript"]').eq(6).html())

    var goodsid=filename.match(/\-[^\)]*\./)[0].replace("\-","").replace("\.","");
    result.push(goodsid);
    if(!$('script[type="text/javascript"]').eq(6).html()){console.log(goodsid)}
    result.push($('script[type="text/javascript"]').eq(6).html().match(reg)[1].
    replace("[","").replace("]","").replace(/\"/g,"").trim());
    result.push($(".mr10 .num").html().trim());
    result.push($(".J_SaleNum").html().trim());
    result.push($(".J_GoodsStock").html());

    //console.log(result)

    insertGoods(result);

}

function insertGoods(data){

    db.pool.getConnection(function(err, connection) {

        if (err) {

            return;
        }
        connection.query(
        	"ALTER TABLE goods ADD IF NOT EXISTS imgs varchar(555),\
        	ADD IF NOT EXISTS assessnum int,\
        	ADD IF NOT EXISTS sellnum int,\
        	ADD IF NOT EXISTS stocknum varchar(255)",
        	function(err,result){
        		if(err){throw err;console.log("添加失败")}
        			else{
        				console.log("添加字段成功")
        			}
        		});
        var goodsAddSql = 'UPDATE goods SET imgs = "'+data[1]+'", assessnum = "'+data[2]+'", sellnum ="'+data[3]+'", stocknum ="'+data[4]+'" WHERE id = "'+data[0]+'"';
        data.shift();
        var goodsAddSql_Params = data;

        connection.query(goodsAddSql,/*[goodsAddSql_Params],*/function (err, result) {

        	if(err){

        		console.log('[INSERT ERROR] - ',err.message);

        		return;

        	}       

        	console.log('牛逼了撒');

        });
        connection.release();

    });


}

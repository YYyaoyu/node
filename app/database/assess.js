var mysql=require('mysql');
var fs=require("fs");
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
	var reg=/\([^\)]*\)/;
	var nullData=[];
	nullData[0]=[];
	
	data=JSON.parse(data.match(reg)[0].replace("\(","").replace("\)","")).data?JSON.parse(data.match(reg)[0].replace("\(","").replace("\)","")).data.list:nullData;
    //console.log(data)
    var goodsid=filename.match(/\-[^\)]*\./)[0].replace("\-","").replace("\.","");
    var assessList=[];
    for(var i in data){

    	assessList[i]=[];
    	assessList[i].push(goodsid);
    	assessList[i].push(data[i].rateId||"");
    	assessList[i].push(data[i].content||"");
    	assessList[i].push(data[i].time||"");
    	assessList[i].push(data[i].style||"");
    	assessList[i].push(data[i].images?data[i].images.join(","):"");
    	assessList[i].push(data[i].user?data[i].user.uname:"");
    	assessList[i].push(data[i].user?data[i].user.avatar:"");
    }
     

    insertGoods(assessList);

}

function insertGoods(data){

    db.pool.getConnection(function(err, connection) {

        if (err) {
            return;
        }
        connection.query(
        	"CREATE TABLE IF NOT EXISTS assess(id varchar(255),rateid varchar(255),content varchar(255),time varchar(255),style varchar(255),images varchar(255),uname varchar(255),avatar varchar(255))",
        	function(err,result){
        		if(err){throw err}
        			else{
        				console.log("创建表成功")
        			}
        		});
        var  goodsAddSql = 'INSERT INTO assess(id,rateid,content,time,style,images,uname,avatar) VALUES ?';

        var  goodsAddSql_Params = data;

        connection.query(goodsAddSql,[goodsAddSql_Params],function (err, result) {

        	if(err){

        		console.log('[INSERT ERROR] - ',err.message);

        		return;

        	}       

        	console.log('牛逼了');

        });
        connection.release();

    });


}

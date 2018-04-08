var mysql=require('mysql');
var fs = require('fs');
var https = require("https");  
var http=require("http");
var iconv = require("iconv-lite"); 
var db=require('../config/database');

var Model=function(type){
    this.type=type;
}

Model.prototype.collect=function(options,filename){

  http.get(options, function (res) {  
    var datas = [];  
    var size = 0;  
    res.on('data', function (data) { 

      datas.push(data);  
      size += data.length;  

    });  
    res.on("end", function () {  
        var buff = Buffer.concat(datas, size);  
        var result = iconv.decode(buff, "utf-8");//转码//var result = buff.toString();//不需要转编码,直接tostring  
         //result=unescape(result.replace(/\\u/g, '%u'));
         //console.log(JSON.stringify(result))
         /*fs.exists(__dirname +"../../data/"+filename,function(exists){

          if(exists){
            console.log("已存在")
          }
          else{
           fs.mkdir(__dirname +"../../data/"+filename,function(err){
            if(err) throw err;
            console.log('创建成功');
           })
          }
         })*/
         fs.writeFile(__dirname +"../../data/"+filename, result, {flag: 'a'}, function (err) {

           if(err) {

             console.error(err);
           } else {
            var reg=/\-[^\)]*\./;
            console.log('写入成功');
            require("../database/"+(filename.match(reg)?filename.replace(filename.match(reg)[0],"."):filename))(filename);

           }
         });


       });  
  }).on("error", function (err) {  
    console.log("采集歇菜");
  });     
}
Model.prototype.collectHtml=function(options,filename){

}
Model.prototype.find = function(id, callback) {
    var sql = "SELECT * FROM "+this.type+(id?" WHERE id =?":"");

    db.pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, [id], function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, results);
        });
    });
};
Model.prototype.addField=function(fileds,){

}
module.exports=Model;

var db=require('../config/database');

var Model=function(type){
	this.type=type;
};
Model.prototype.createTable=function(fields){

    var sql = "CREATE TABLE IF NOT EXISTS "+ this.type + fields;
    db.pool.getConnection(function(err, connection) {
        if (err) {
           
            return;
        }
        // make the query
        connection.query(sql,[], function(err, results) {
            if (err) {
              
                return;
            }
           
        });
    });    
};
Model.prototype.insert = function(data) {

    var models=require("../models/"+this.type+"/"+this.type);

    var sql = "INSERT INTO "+this.type + " SET ?";

    db.pool.getConnection(function(err, connection) {
        if (err) {
            return;
        }
        // make the query
        connection.query(sql, data, function(err, results) {

            if (err) {
                return;
            }

        });
    });
};
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
module.exports=Model;


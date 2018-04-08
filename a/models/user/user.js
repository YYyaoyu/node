var User=function(){
    this.fields=
        '(uid bigint(20) PRIMARY KEY AUTO_INCREMENT,\
        username varchar(20),\
        password varchar(32))'
}
module.exports=User;


const clHelper=require("./config/clHelper");
module.exports=function(){

  clHelper.getModel("goods").find("",function(err,result){
    result.map(function(data){
      clHelper.getModel("collection").collect({
        hostname: 'shop.mogujie.com',
        path: 'http://shop.mogujie.com/detail/'+data.id,

        headers:{

        }
      },"detail-"+data.id+".js");
    })

  })
}

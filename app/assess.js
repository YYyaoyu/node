
const clHelper=require("./config/clHelper");

module.exports=function(){

  clHelper.getModel("goods").find("",function(err,result){

    result.map(function(data){
      clHelper.getModel("collection").collect({
        hostname: 'rate.mogujie.com',
        path: 'http://rate.mogujie.com/jsonp/pc.rate.ratelist/v2?callback=jQuery21105162698435024522_1519456854873&pageSize=20&sort=1&isNewDetail=1&itemId='+data.id+'&type=1&marketType=market_mogujie&_=1519456854874',

        headers:{
          'Cookie':'_ga=GA1.2.1631634159.1518154084; __mgjuuid=6bdb8e64-42ad-48a3-8b8c-336df589dcec; _gid=GA1.2.522279686.1519450619; _mwp_h5_token_enc=4be746a07f428e11482169a611ccbf22; _mwp_h5_token=3053492cea608139b0524d6964466978_1519450643319; nekot=1ulo%2F3uoczHIC7v1Xyd6op4fUOrKVw0Im%2BmdPbTOLojp%2Fa0qLQU7H15ud6eqzvdKVZjBL6Tv8if0GhH%2B93QWJw%3D%3D; _gat=1; JSESSIONID=7E1BE580BF86C8AD83D64CD99324C97E',
          'Referer':'http://shop.mogujie.com/detail/18o5vge?acm=3.ms.1_4_18o5vge.15.1345-71195-68998.sDEwRqKyotuEt.sd_117_116-swt_15-imt_6-t_sDEwRqKyotuEt-lc_3-fcid_52014-pid_25-bid_15-dit_24&ptp=1.Gz184b._b_215dd2d06f11ed2f_0.1.6Azv6R9&_b_key=food_0..0',
        }
      },"assess-"+data.id+".js");
    })

  })

}

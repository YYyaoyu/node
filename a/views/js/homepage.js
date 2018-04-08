(function(){

    //var $=require('../../public/js/jquery.min.js');

    //require("../css/homepage.css");
    //require("/views/css/homepage.css");
    var data=[];
    $.ajax({
        url:'getgoodslist',
        type:'GET', //GET
        async:true,    //或false,是否异步
        data:{

        },
        timeout:5000,    //超时时间
        dataType:'',    //返回的数据格式：json/xml/html/script/jsonp/text

        success:function(data,textStatus,jqXHR){
            showGoods(data);
        },
        error:function(xhr,textStatus){
            console.log('错误')
        }
    })

    function showGoods(data){
       for(var i in data){
           $(".rec-cont ul").append(
              '<li>\
              <a href="/goodsdetail?id='+data[i].id+'" target="_blank">\
              <div class="rcr">\
              <div class="rcr-top">\
              <img src="'+data[i].img+'" width="200px"/>\
              </div>\
              <div class="rcr-bot">\
              <div class="rb-top">'+data[i].title+'</div>\
              <div class="second_P">\
              <span class="fk-prop-price">￥'+data[i].price+'</span>\
              <span class="second_Marketprice">￥'+data[i].orgprice+'</span>\
              </div>\
              </div>\
              </div>\
              </a>\
              </li>'
              );
       }
    }

})();

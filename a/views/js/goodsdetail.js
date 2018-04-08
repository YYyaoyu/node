(function(){
    var data=[];
    $.ajax({
        url:'getassess'+location.search,
        type:'GET', //GET
        async:true,    //或false,是否异步
        data:{

        },
        timeout:5000,    //超时时间
        dataType:'',    //返回的数据格式：json/xml/html/script/jsonp/text

        success:function(data,textStatus,jqXHR){
            showAssess(data);
        },
        error:function(xhr,textStatus){
            console.log('错误')
        }
    })
    function showAssess(data){
        for(var i in data){
            $(".comment-content ul").append(
                '<li class="clearfix">\
                <div class="avatar fl"><img src="'+data[i].avatar+'" /></div>\
                <div class="info fl">\
                <div class="top">\
                <span class="name">'+data[i].uname+'</span>\
                <span class="time">'+data[i].time+'</span>\
                </div>\
                <div class="middle">'+data[i].content+'</div>\
                <div class="bottom">'+data[i].style+'</div>\
                <div class="info-img"></div>\
                </div>\
                </li>'  
                );
            for(var j in data[i].images.split(",")){
                if(data[i].images){
                    $(".comment-content ul li").eq(i).find(".info-img").append(                             
                     '<img src="'+data[i].images.split(",")[j]+'"/>'
                    );                    
                }

            }
        }
    }
})();


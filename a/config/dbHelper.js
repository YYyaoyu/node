var Model=require('../config/model');
module.exports={
    model:function(type){
        return new Model(type);
    }
}


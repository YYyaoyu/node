var Model=require("../config/model");

module.exports={

  getModel:function(type){
      return new Model(type);
  }

}


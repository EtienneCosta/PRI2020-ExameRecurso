let mongoose = require('mongoose');


var memberSchema = mongoose.Schema({
    id:String,
    name: String,
    course: String,
    scores:[Number]

  });
   
var equipeSchema = new mongoose.Schema({
    _id:String,
    guid: String,
    team: String,
    pitch1:Boolean,
    pitch2:Boolean,
    techPitch:Boolean,
    businessReport:Boolean,
    techReport:Boolean,
    members:[memberSchema]    
  });

module.exports = mongoose.model('teams',equipeSchema);
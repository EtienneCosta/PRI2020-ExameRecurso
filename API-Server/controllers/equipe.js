var mongoose = require('mongoose');
var Equipe = require('../models/equipe');

module.exports.list = ()=>{
    return Equipe.aggregate([{$project: {_id:1,team:1,pitch1:1,pitch2:1,techPitch:1,businessReport:1,techReport:1,nmembers:{$size:"$members"}}}]).exec()
}

module.exports.lookup = (iden)=>{
    return Equipe.find({_id:iden}).exec()
}

module.exports.lookupmember =(id,idMember)=>{

    return Equipe.aggregate([{$unwind:'$members'},{$match:{'_id':id,'members.id':idMember}}]).exec()
}


/* Insere uma lista de compras na base de dados */
module.exports.insertequipe = equipe  =>{
    var novaEquipe= new Equipe (equipe);
    return novaEquipe.save()
}

/*
Insere um novo produto numa determinada lista de compras 
(o registo do produto é fornecido em JSON no body);
*/
module.exports.insertmember = (iden,member)  =>{
    return Equipe.findByIdAndUpdate({_id:iden},{$push:{members:member}})
}

module.exports.deleteequipe=(iden)=>{
    return Equipe.deleteOne({_id:iden}).exec()
}


module.exports.deletemember=(equipe,member)=>{
    return Equipe.findByIdAndUpdate({_id:equipe},{$pull: {members:{id:member}}}).exec()
}
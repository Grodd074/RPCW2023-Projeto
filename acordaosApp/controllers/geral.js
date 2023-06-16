var Acordaos = require("../models/geral")
var mongoose = require('mongoose')

// get todos os contratos
module.exports.list = () => {
    return Acordaos.find()
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

module.exports.consultarProcesso = proc => {
    return Acordaos.findOne({Processo: proc}).exec()
}

module.exports.consultarDescritores = proc => {
    return Acordaos.findOne({Processo: proc}).get("Descritores").exec()
}

/* get by tribunal */

module.exports.consultarTribunal = trib => {
    return Acordaos.find({Tribunal: trib}).exec()
}

/* Get by date*/

module.exports.listDate = date => {
    return Acordaos.find({"Data do Acordão":date}).exec()
}

/* 
module.exports.inserir = acordao => {
    acordao.Processo = mongoose.Types.ObjectId()
    var novo = new Acordaos(acordao)
    return novo.save()
}
*/


/* 
module.exports.eliminar = proc => {
    return Acordaos.deleteOne({"Processo": proc})
}
*/

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

module.exports.page = (pageNumber) => {
    return Acordaos.find().skip((pageNumber-1)*30).limit(30)
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

module.exports.consultarProcesso = id => {
    return Acordaos.findOne({Id: id})
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

module.exports.consultarDescritores = proc => {
    return Acordaos.findOne({Processo: proc}).get("Descritores")
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

/* get by tribunal */

module.exports.consultarTribunal = trib => {
    return Acordaos.find({Tribunal: trib})
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

/* Get by date*/

module.exports.listDate = date => {
    return Acordaos.find({"Data do Acordão":date})
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
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

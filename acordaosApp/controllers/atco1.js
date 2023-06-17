var Acordaos = require("../models/atco1")
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

module.exports.findAcordao = a => {
    return Acordaos.findOne({"Acordão": a}).exec()
}

module.exports.findProcesso = proc => {
    return Acordaos.findOne({Processo: proc}).exec()
}

module.exports.listByRelator = rel => {
    return Acordaos.find({Relator: rel}).exec()
}

module.exports.listRelatores = () => {
    return Acordaos.distinct("Relator").exec()
}

/* dá os descritores de um processo */
module.exports.consultarDescritores = proc => {
    return Acordaos.findOne({Processo: proc}).get("Descritores").exec()
}

/* get by descritor */
module.exports.listByDescritor = desc => {
    return Acordaos.find({Descritores: {$in: [desc]}}).exec()
}

module.exports.listDescritores = () => {
    return Acordaos.distinct(Descritores).exec()
}

/* Get by date*/

module.exports.listByDate = date => {
    return Acordaos.find({"Data do Acordão":date}).exec()
}

module.exports.listByEspecie = esp => {
    return Acordaos.find({"Espécie": esp}).exec()
}

module.exports.listByPrivacidade = priv => {
    return Acordaos.find({Privacidade: priv}).exec()
}

module.exports.listByAreaOne = area => {
    return Acordaos.find({"Área Temática 1": area}).exec()
}

module.exports.listByAreaTwo = area => {
    return Acordaos.find({"Área Temática 2": area}).exec()
}

module.exports.listInstituicoes = () => {
    return Acordaos.distinct("NomeInstituicao").exec()
}

/* Não sei se está certo*/
module.exports.inserir = acordao => {
    acordao.Processo = mongoose.Types.ObjectId()
    var novo = new Acordaos(acordao)
    return novo.save()
}

module.exports.eliminar = proc => {
    return Acordaos.deleteOne({"Processo": proc})
}

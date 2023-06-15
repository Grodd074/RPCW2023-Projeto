var Acordaos = require("../models/atco")
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

module.exports.consultarNConvencional = nconv => {
    return Acordaos.findOne({"Nº Convencional": nconv}).exec()
}

module.exports.consultarAcordao = a => {
    return Acordaos.findOne({"Acordão": a}).exec()
}

module.exports.consultarProcesso = proc => {
    return Acordaos.findOne({Processo: proc}).exec()
}

/*get by relator*/

module.exports.consultarRelator = rel => {
    return Acordaos.find({Relator: rel}).exec()
}

/*get all the relatores*/

module.exports.listRelatores = () => {
    return Acordaos.distinct("Relator").exec()
}

module.exports.consultarRelator = rel => {
    return Acordaos.findOne({Relator: rel}).exec()
}

/* Get by date*/

module.exports.listDate = date => {
    return Acordaos.find({"Data do Acordão":date}).exec()
}

/* GET /contracts/institutions: devolve a lista das instituições contratantes (sem repetições);*/
module.exports.consultarInstituicoes = () => {
    return Acordaos.distinct("NomeInstituicao").exec()
}

/* POST /contracts: acrescenta um contrato novo à BD;*/
module.exports.inserir = acordao => {
    acordao.Processo = mongoose.Types.ObjectId()
    var novo = new Acordaos(acordao)
    return novo.save()
}

/* DELETE /contracts/:id: elimina da BD o contrato com o identificador id.*/
module.exports.eliminar = proc => {
    return Acordaos.deleteOne({"Processo": proc})
}

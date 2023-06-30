var Acordaos = require("../models/jtrg")
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

module.exports.findById = id => {
    return Acordaos.findOne({_id:id})
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

module.exports.findProcesso = proc => {
    return Acordaos.findOne({Processo: proc})
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

/* GET /contracts/:id: devolve o contrato com identificador id; */
module.exports.consultar = id => {
    return Acordaos.findOne({id: id}).exec()
}

/* GET /contracts?year=YYYY: devolve a lista dos contratos realizados durante o ano YYYY; */
module.exports.listYear = year => {
    return cModel.find({"DataInicioContrato":{$regex:String(year)}})
    .then(dados=>{
        return dados;
    })
    .catch(erro=>{
        return erro;
    });
}

/* GET /contracts?inst=AAA: devolve a lista dos contratos realizados pela instituição contratante AAA;*/
module.exports.consultarInst = inst => {
    return Acordaos.find({NomeInstituicao: inst}).exec()
}


/* GET /contracts/courses: devolve a lista dos cursos dos contranoatados (sem repetições);*/
module.exports.consultarCursos = () => {
    return Acordaos.distinct("Curso").exec()
}

/* GET /contracts/institutions: devolve a lista das instituições contratantes (sem repetições);*/
module.exports.consultarInstituicoes = () => {
    return Acordaos.distinct("NomeInstituicao").exec()
}

/* POST /contracts: acrescenta um contrato novo à BD;*/
module.exports.inserir = acordao => {
    return Acordaos.create(acordao)
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

/* DELETE /contracts/:id: elimina da BD o contrato com o identificador id.*/
module.exports.eliminar = id => {
    return Acordaos.deleteOne({_id:id})
    .then(dados => {
        console.log(dados)
        return dados
    })
    .catch(erro => {
        return erro
    })
}

module.exports.editar = (id, acordao) => {
    return Acordaos.updateOne({_id:id}, acordao)
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

module.exports.aceita = (id) => {
    return Acordaos.updateOne({_id:id}, { $unset: { Aceite: "" } })
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}
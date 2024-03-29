var Acordaos = require("../models/geral")
var mongoose = require('mongoose')
const { listDescritores } = require("./atco1")

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
    return Acordaos.find().sort({Data:-1}).skip((pageNumber-1)*30).limit(30)
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

module.exports.aceita = (id) => {
    return Acordaos.updateOne({Id:id}, { $unset: { Aceite: "" , User: ""} })
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

module.exports.getTribunais = () => {
    return Acordaos.aggregate([
        {$group: {_id: "$Tribunal", count: {$sum: 1}}},
        {$sort: {count: -1}},
        {$project: {_id: 0, Tribunal: "$_id"}}
    ]).then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

module.exports.MaxPage = (filters) => {
    return Acordaos.countDocuments(filters)
    .then(dados => {
        return Math.ceil(dados/30)
    })
    .catch(erro => {
        return erro
    })
}

module.exports.pageFilters = (page, filters) => {
    return Acordaos.find(filters).sort({Data:-1}).skip((page-1)*30).limit(30)
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

module.exports.consultarId = id => {
    return Acordaos.findOne({Id: id})
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

module.exports.consultarDescritores = (listDescritores, page) => {
    return Acordaos.find({Descritores: {$in: listDescritores}}).sort({Data:-1}).skip((page-1)*30).limit(30)
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

module.exports.taxonomiaDescritores = () => {
    return Acordaos.aggregate([
        {$unwind: "$Descritores"},
        {$group: {_id: "$Descritores", count: {$sum: 1}}},
        {$sort: {count: -1}},
        {$limit: 30},
        {$project: {_id: 0, Descritor: "$_id"}}
    ])
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

/* get by tribunal */

module.exports.consultarTribunal = trib => {
    return Acordaos.find({Tribunal: trib}).sort({Data:-1})
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

/* Get by date*/

module.exports.listDate = date => {
    return Acordaos.find({"Data do Acordão":date}).sort({Data:-1})
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

module.exports.inserirEntrada = (acordao, idAcordao) => {
    
    // Recebe 'acordao' completo

    // Dados para a "gerals"
    var subsetAcordao = {Id : idAcordao, 
        Processo : acordao.Processo, 
        Data : acordao["Data do Acordão"], 
        Tribunal : acordao.tribunal, 
        Descritores : acordao.Descritores}

    if(acordao.Aceite != undefined){
        subsetAcordao.Aceite = acordao.Aceite
        subsetAcordao.User = acordao.User
    }

    return Acordaos.create(subsetAcordao)
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })

}
 
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

module.exports.editarEntrada = (acordao, idAcordao) => {
    
    // Dados para a "gerals"
    var descritores = acordao.Descritores.toString()
    var descritoresArray = descritores.split(',')
    
    var subsetAcordao = {Id : idAcordao, 
        Processo : acordao.Processo, 
        Data : acordao["Data do Acordão"], 
        Tribunal : acordao.tribunal,
        Descritores : descritoresArray
    }

    return Acordaos.updateOne({Id:idAcordao}, subsetAcordao)
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
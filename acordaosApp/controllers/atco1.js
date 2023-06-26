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

module.exports.findById = id => {
    return Acordaos.findOne({_id:id})
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

module.exports.findAcordao = a => {
    return Acordaos.findOne({"Acordão": a})
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

module.exports.listByRelator = rel => {
    return Acordaos.find({Relator: rel})
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

module.exports.listRelatores = () => {
    return Acordaos.distinct("Relator")
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

/* dá os descritores de um processo */
module.exports.consultarDescritores = proc => {
    return Acordaos.findOne({Processo: proc}).get("Descritores")
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

/* get by descritor */
module.exports.listByDescritor = desc => {
    return Acordaos.find({Descritores: {$in: [desc]}})
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

module.exports.listDescritores = () => {
    return Acordaos.distinct(Descritores)
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

/* Get by date*/

module.exports.listByDate = date => {
    return Acordaos.find({"Data do Acordão":date})
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

module.exports.listByEspecie = esp => {
    return Acordaos.find({"Espécie": esp})
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

module.exports.listByPrivacidade = priv => {
    return Acordaos.find({Privacidade: priv})
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

module.exports.listByAreaOne = area => {
    return Acordaos.find({"Área Temática 1": area})
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

module.exports.listByAreaTwo = area => {
    return Acordaos.find({"Área Temática 2": area})
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

module.exports.listInstituicoes = () => {
    return Acordaos.distinct("NomeInstituicao")
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

module.exports.inserir = acordao => {
    console.log(acordao)
    acordao.Processo = new mongoose.Types.ObjectId()
    return Acordaos.create(acordao)
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

module.exports.eliminar = proc => {
    return Acordaos.deleteOne({"Processo": proc})
}

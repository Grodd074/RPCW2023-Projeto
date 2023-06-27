// User API controller
//
const user = require('../models/user')
var User = require('../models/user')

module.exports.list = () => {
    return User
            .find()
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getUser = username => {
    return User.findOne({username:username})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.updateUser = (username, info) => {
    return User.updateOne({username:username}, info)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.updateUserStatus = (username, status) => {
    return User.updateOne({username:username}, {active: status})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.deleteUser = username => {
    return User.deleteOne({username:username})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.atualizaUltimoAcesso = username => {
    data = new Date().toISOString().substring(0,16)
    return User.updateOne({username:username}, {dataUltimoAcesso: data})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.addFavorito = (username, favorito) => {
    return User.updateOne({username:username}, {$push: {favoritos: favorito}})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.removeFavorito = (username, favorito) => {
    return User.updateOne({username:username}, {$pull: {favoritos: favorito}})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getFavoritos = username => {
    return User.findOne({username:username}, {favoritos: 1})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}
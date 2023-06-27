var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose')

var Favorito = new Schema({
    idRegisto: mongoose.Types.ObjectId,
    tribunal: String,
    descricao: String
}, {_id: false, versionKey: false})

var User = new Schema({
    username: String,
    nome: String,
    email: String,
    filiacao: String,
    nivel: String,
    dataRegistro: String,
    dataUltimoAcesso: String,
    favoritos: [Favorito]
}, {versionKey: false})

User.plugin(passportLocalMongoose) 

module.exports = mongoose.model('user', User)


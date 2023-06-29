var mongoose = require('mongoose')

var acordaosSchema = new mongoose.Schema({
    "Data": String,
    "Data de Entrada": String,
    "Data do Acordão": String,
    "Decisão": String,
    "Decisão Texto Integral": String,
    "Descritores": [String],
    "Indicações Eventuais": String,
    "Legislação Nacional": String,
    "Meio Processual": String,
    "Nº Convencional": String,
    "Nº do Volume": String,
    "Objecto": String,
    "Processo": String,
    "Recorrente": String,
    "Recorrido 1": String,
    "Recorrido 2": String,
    "Referência Publicação 2": String,
    "Referência a Doutrina": String,
    "Relator": String,
    "Secção": String,
    "Sumário": String,
    "Tribunal": String,
    "Votação": String,
    "_id": String,
    "url": String
}, { versionKey: false })

module.exports = mongoose.model('jtcn', acordaosSchema)
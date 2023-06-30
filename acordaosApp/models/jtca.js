var mongoose = require('mongoose')

/*atualizar*/

var acordaosSchema = new mongoose.Schema({
    Data: String,
    "Data do Acordão": String,
    Decisão: String,
    "Decisão Texto Integral": String,
    Descritores: [String],
    "Meio Processual": String,
    "Nº Convencional": String,
    "Nº do Volume": String,
    Processo: String,
    Recorrente: String,
    "Referência Publicação 2": String,
    "Referência a Doutrina": String,
    Relator: String,
    Secção: String,
    Sumário: String,
    Tribunal: String,
    Votação: String,
    url: String,
    "Área Temática 2": String,
    Aceite: Boolean
}, { versionKey: false })

module.exports = mongoose.model('jtca', acordaosSchema)
var mongoose = require('mongoose')

var acordaosSchema = new mongoose.Schema({
    Processo: String,
    "Nº Convencional": String,
    Relator: String,
    Descritores: [String],
    "Nº do Documento": String,
    "Data do Acordão": String,
    Votação: String,
    "Texto Integral": String,
    Privacidade: String,
    "Meio Processual": String,
    Decisão: String,
    "Indicações Eventuais": String,
    "Área Temática": String,
    Sumário: String,
    Reclamações: String,
    "Decisão Texto Integral": String,
    url: String,
    tribunal: String
}, { versionKey: false })

module.exports = mongoose.model('jtrp', acordaosSchema)
var mongoose = require('mongoose')

var acordaosSchema = new mongoose.Schema({
    Processo: String,
    Relator: String,
    Descritores: [String],
    "Nº do Documento": String,
    "Data do Acordão": String,
    "Votação": String,
    "Texto Integral": String,
    "Meio Processual": String,
    "Decisão": String,
    "Indicações Eventuais": String,
    "Sumário": String,
    url: String,
    tribunal: String
}, { versionKey: false })

module.exports = mongoose.model('jtrg', acordaosSchema)
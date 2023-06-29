var mongoose = require('mongoose')

var acordaosSchema = new mongoose.Schema({
    "Data do Acordão": String,
    Decisão: String,
    "Decisão Texto Integral": String,
    Descritores: [String],
    "Indicações Eventuais": String,
    "Jurisprudência Nacional": String,
    "Legislação Estrangeira": String,
    "Legislação Nacional": String,
    "Meio Processual": String,
    "Nº Convencional": String,
    "Nº do Documento": String,
    Privacidade: String,
    Processo: String,
    Relator: String,
    Sumário: String,
    "Texto Integral": String,
    Votação: String,
    tribunal: String,
    url: String,
    "Área Temática": String
}, { versionKey: false })

module.exports = mongoose.model('jtrg', acordaosSchema)
var mongoose = require('mongoose')

var acordaosSchema = new mongoose.Schema({
    "Apenso": String,
    "Data": String,
    "Data do Acordão": String,
    "Decisão": String,
    "Decisão Texto Integral": String,
    "Descritores": [String],
    "Indicações Eventuais": String,
    "Jurisprudência Nacional": String,
    "Legislação Comunitária": String,
    "Legislação Estrangeira": String,
    "Legislação Nacional": String,
    "Meio Processual": String,
    "Nº Convencional": String,
    "Nº do Documento": String,
    "Nº Único do Processo": String,
    "Privacidade": String,
    "Processo": String,
    "Recurso": String,
    "Referência Processo": String,
    "Relator": String,
    "Sumário": String,
    "Texto Integral": String,
    "Tribunal Recurso": String,
    "Votação": String,
    "_id": String,
    "url": String,
    "Área Temática": String
}, { versionKey: false })

module.exports = mongoose.model('jtrl', acordaosSchema)
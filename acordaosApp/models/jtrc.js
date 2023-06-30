var mongoose = require('mongoose')

var acordaosSchema = new mongoose.Schema({
    Data: String,
    "Data do Acordão": String,
    Decisão: String,
    "Decisão Texto Integral": String,
    Descritores: [String],
    "Indicações Eventuais": String,
    "Jurisprudência Internacional": String,
    "Jurisprudência Nacional": String,
    "Legislação Comunitária": String,
    "Legislação Estrangeira": String,
    "Legislação Nacional": String,
    "Meio Processual": String,
    "Nº Convencional": String,
    "Nº do Documento": String,
    "Nº Único do Processo": String,
    Privacidade: String,
    Processo: String,
    "Processo no Tribunal Recurso": String,
    "Referência de Publicação": String,
    Relator: String,
    Sumário: String,
    "Texto Integral": String,
    "Tribunal Recurso": String,
    Votação: String,
    tribunal: String,
    url: String,
    "Área Temática": String,
    Aceite: Boolean
}, { versionKey: false })

module.exports = mongoose.model('jtrc', acordaosSchema)
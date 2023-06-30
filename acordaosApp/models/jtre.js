var mongoose = require('mongoose')

var acordaosSchema = new mongoose.Schema({
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
    "Nº do Documento": String,
    Processo: String,
    "Processo no Tribunal Recorrido": String,
    "Referência Processo": String,
    "Referências Internacionais": String,
    Relator: String,
    Sumário: String,
    "Texto Integral": String,
    "Tribunal Recorrido": String,
    Votação: String,
    tribunal: String,
    url: String,
    "Área Temática": String,
    Aceite: Boolean
}, { versionKey: false })

module.exports = mongoose.model('jtre', acordaosSchema)
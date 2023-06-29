var mongoose = require('mongoose')

var acordaosSchema = new mongoose.Schema({

    Apenso: String,
    "Data Dec. Recorrida": String,
    "Data do Acordão": String,
    Decisão: String,
    "Decisão Texto Integral": String,
    Descritores: [String],
    "Indicações Eventuais": String,
    "Jurisprudência Estrangeira": String,
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
    "Processo no Tribunal Recorrido": String,
    Reclamações: String,
    Recurso: String,
    "Referência Processo": String,
    "Referência de Publicação": String,
    "Referências Internacionais": String,
    Relator: String,
    Sumário: String,
    "Texto Integral": String,
    "Tribunal Recorrido": String,
    Votação: String,
    tribunal: String,
    url: String,
    "Área Temática": String
}, { versionKey: false })

module.exports = mongoose.model('jtrp', acordaosSchema)
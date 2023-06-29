var mongoose = require('mongoose')

/*atualizar*/

var acordaosSchema = new mongoose.Schema({
    Apenso: String,
    Data: String,
    "Data da Decisão Sumária": String,
    "Data da Reclamação": String,
    "Data do Acordão": String,
    Decisão: String,
    "Decisão Texto Integral": String,
    Descritores: [String],
    Doutrina: String,
    "Indicações Eventuais": String,
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
    Recurso: String,
    "Referência Processo": String,
    Relator: String,
    Sumário: String,
    "Texto Integral": String,
    "Tribunal Recurso": String,
    Votação: String,
    url: String,
    "Área Temática": String
}, { versionKey: false })

module.exports = mongoose.model('jstj', acordaosSchema)
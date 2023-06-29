var mongoose = require('mongoose')

var acordaosSchema = new mongoose.Schema({
    "Ano da Publicação": String,
    "Apêndice": String,
    "Data": String,
    "Data de Entrada": String,
    "Data do Acordão": String,
    "Data do Apêndice": String,
    "Decisão": String,
    "Descritores": [String],
    "Indicações Eventuais": String,
    "Legislação Nacional": String,
    "Meio Processual": String,
    "Nº Convencional": String,
    "Nº do Documento": String,
    "Nº do Volume": String,
    "Objecto": String,
    "Privacidade": String,
    "Processo": String,
    "Página": String,
    "Recorrente": String,
    "Recorrido 1": String,
    "Recorrido 2": String,
    "Recusa Aplicação": String,
    "Relator": String,
    "Secção": String,
    "Sumário": String,
    "Texto Integral": String,
    "Tribunal": String,
    "Votação": String,
    "_id": String,
    "url": String,
    "Área Temática 1": String,
    "Área Temática 2": String
}, { versionKey: false })

module.exports = mongoose.model('jsta', acordaosSchema)
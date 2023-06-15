var mongoose = require('mongoose')

var acordaosSchema = new mongoose.Schema({
    Processo: String,
    "Nº Convencional": String,
    Relator: String,
    Descritores: [String],
    "Data do Acordão": String,
    Votação: String,
    "Tribunal Recurso": String,
    "Texto Integral": String,
    "Meio Processual": String,
    Decisão: String,
    "Legislação Nacional": String,
    "Decisão Texto Integral": String,
    url: String,
    tribunal: String
}, { versionKey: false })

module.exports = mongoose.model('jtrc', acordaosSchema)
var mongoose = require('mongoose')

var acordaosSchema = new mongoose.Schema({
    Processo: String,
    Relator: String,
    Descritores: [String],
    "Nº do Documento": String,
    "Data do Acordão": String,
    "Votação": String,
    "Texto Integral": String,
    "Texto Parcial": String,
    "Meio Processual": String,
    "Decisão": String,
    "Sumário": String,
    url: String,
    tribunal: String
}, { versionKey: false })

module.exports = mongoose.model('jtrl', acordaosSchema)
var mongoose = require('mongoose')

var acordaosSchema = new mongoose.Schema({
    Processo: String,
    "Data do Acordão": String,
    Tribunal: String,
    Relator: String,
    Descritores: [String],
    "Nº Convencional": String,
    "Nº do Documento": String,
    "Data de Entrada": String,
    Recorrente: String,
    "Recorrido 1": String,
    Votação: String,
    "Área Temática 1": String,
    "Texto Integral": String,
    url: String,
    tribunal: String
}, { versionKey: false })

module.exports = mongoose.model('jcon', acordaosSchema)
var mongoose = require('mongoose')

var acordaosSchema = new mongoose.Schema({
    Processo: String,
    Relator: String,
    Descritores: [String],
    "Data do Acordão": String,
    Votação: String,
    "Texto Integral": String,
    Sumário: String,
    "Decisão Texto Integral": String,
    url: String,
    tribunal: String
}, { versionKey: false })

module.exports = mongoose.model('jtre', acordaosSchema)
var mongoose = require('mongoose')

var acordaosSchema = new mongoose.Schema({
    Processo: String,
    Secção: String,
    "Data do Acordão": String,
    Relator: String,
    Descritores: [String],
    Votação: String,
    "Decisão Texto Integral": String,
    url: String,
    tribunal: String
}, { versionKey: false })

module.exports = mongoose.model('jtca', acordaosSchema)
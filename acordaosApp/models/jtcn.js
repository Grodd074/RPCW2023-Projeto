var mongoose = require('mongoose')

var acordaosSchema = new mongoose.Schema({
    Processo: String,
    Secção: String,
    "Data do Acordão": String,
    Tribunal: String,
    Relator: String,
    Descritores: [String],
    Sumário: String,
    Recorrente: String,
    "Recorrido 1": String,
    Votação: Unanimidade,
    "Meio Processual": String,
    "Parecer Ministério Publico": String,
    "Decisão Texto Integral": String,
    url: String,
    tribunal: jtcn
}, { versionKey: false })

module.exports = mongoose.model('jtcn', acordaosSchema)
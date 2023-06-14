var mongoose = require('mongoose')

var acordaosSchema = new mongoose.Schema({
    Contencioso: String,
    "Peça Processual": String,
    Data: String,
    Processo: String,
    "Nº Processo/TAF": String,
    "Sub-Secção": String,
    Magistrado: String,
    Descritores: [String],
    Tema: String,
    url: String,
    tribunal: String
}, { versionKey: false })

module.exports = mongoose.model('jtcampct', acordaosSchema)
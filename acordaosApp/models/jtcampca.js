var mongoose = require('mongoose')

var acordaosSchema = new mongoose.Schema({
    Contencioso: String,
    Data: String,
    Processo: String,
    "Nº Processo/TAF": String,
    "Sub-Secção": String,
    Magistrado: String,
    Descritores: [String],
    url: String,
    tribunal: String
}, { versionKey: false })

module.exports = mongoose.model('jtcampca', acordaosSchema)
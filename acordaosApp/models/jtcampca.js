var mongoose = require('mongoose')

var acordaosSchema = new mongoose.Schema({
    "Contencioso": String,
    "Data": String,
    "Data do Acordão": String,
    "Descritores": [String],
    "Disponível na JTCA": String,
    "Magistrado": String,
    "Nº Processo/TAF": String,
    "Observações": String,
    "Processo": String,
    "Sub-Secção": String,
    "_id": String,
    "tribunal": String,
    "url": String
}, { versionKey: false })

module.exports = mongoose.model('jtcampca', acordaosSchema)
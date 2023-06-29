var mongoose = require('mongoose')

var acordaosSchema = new mongoose.Schema({
    "Autor": String,
    "Data da Decisão": String,
    "Data do Acórdão": String,
    "Decisão": String,
    "Descritores": [String],
    "Juízo ou Secção": String,
    "Processo": String,
    "Recursos": String,
    "Relator": String,
    "Réu": String,
    "Texto Integral": String,
    "Texto das Cláusulas Abusivas": String,
    "Tipo de Ação": String,
    "Tipo de Contrato": String,
    "Tribunal 1ª instância": String,
    "_id": String,
    "tribunal": String,
    "url": String
}, { versionKey: false })

module.exports = mongoose.model('jdgpj', acordaosSchema)
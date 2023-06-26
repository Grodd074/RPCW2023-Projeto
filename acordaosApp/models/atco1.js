var mongoose = require('mongoose')

var acordaosSchema = new mongoose.Schema({
    "Nº Convencional": String,
    Acordão: String,
    Processo: String,
    Relator: String,
    Descritores: [String],
    "Nº do Documento": String,
    "Data do Acordão": String,
    Espécie: String,
    Requerente: String,
    Requerido: String,
    Votação: String,
    Privacidade: String,
    "Normas Apreciadas": String,
    "Normas Julgadas Inconst.": String,
    "Área Temática 1": String,
    "Área Temática 2": String,
    Decisão: String,
    Sumário: String,
    "Texto Integral": String,
    url: String,
    tribunal: String
},{versionKey: false})

module.exports = mongoose.model('atco1s',acordaosSchema)
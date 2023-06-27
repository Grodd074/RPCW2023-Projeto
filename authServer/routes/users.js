var express = require('express');
var router = express.Router();
var User = require('../controllers/user')
var userModel = require('../models/user')
var passport = require('passport')
var jwt = require('jsonwebtoken')

function verificaAcesso(req, res, next){
  var myToken = req.query.token || req.body.token
  if(myToken){
    jwt.verify(myToken, "rpcw2023", function(e, payload){
      if(e){
        res.status(401).jsonp({error: e})
      }
      else{
        next()
      }
    })
  }
  else{
    res.status(401).jsonp({error: "Token inexistente!"})
  }
}

// GET users list
router.get('/', verificaAcesso, function(req, res) {
    User.list()
    .then(users => {
      res.jsonp(users)
    })
    .catch(err => {
      res.jsonp({error: err, message: "Erro na obtenção da lista de utilizadores"})
    })
});

// GET user from username
router.get('/:user', verificaAcesso, function(req, res) {
  User.getUser(req.params.user)
    .then(u => {
      res.jsonp(u)
    })
    .catch(erro => {
      res.jsonp({error: erro, message: "Erro na obtenção do utilizador " + req.params.user})
    })
});

router.post('/register', function(req, res) {
  var data = new Date().toISOString().substring(0,16)
  userModel.register(
    new userModel({ 
      username: req.body.username,
      nome: req.body.name,
      email: req.body.email,
      filiacao: req.body.filiacao,
      nivel: req.body.nivel,
      dataRegistro: data,
      dataUltimoAcesso: data,
      favoritos: []
    }), 
    req.body.password, 
    function(err, user) {
      if (err) 
        res.status(520).jsonp({error: err, message: "Register error: " + err})
      else
        res.status(201).jsonp('OK')      
    })
})  

router.post('/login', passport.authenticate('local'), function(req, res){
  jwt.sign({ 
    username: req.user.username,
    level: req.user.nivel,
    sub: 'RPCW2023'}, 
    "rpcw2023",
    {expiresIn: 3600},
    function(e, token) {
      if(e) res.status(500).jsonp({error: "Erro na geração do token: " + e}) 
      else {
        User.atualizaUltimoAcesso(req.user.username)
        .then(u => {
          res.status(200).jsonp({token: token})
        })
        .catch(erro => {
          res.status(500).jsonp({error: erro, message: "Erro na atualização do último acesso"})
        })
      }
    });
})

router.put('/:user', verificaAcesso, function(req, res){
  User.updateUser(req.params.user, req.body)
  .then(u => {
    res.jsonp(u)
  })
  .catch(erro => {
    res.jsonp({error: erro, message: "Erro na alteração do utilizador " + req.params.user})
  })
})

router.delete('/:user', verificaAcesso, function(req, res){
  User.deleteUser(req.params.user)
  .then(u => {
    res.jsonp(u)
  })
  .catch(erro => {
    res.jsonp({error: erro, message: "Erro na remoção do utilizador " + req.params.user})
  })
})

module.exports = router;

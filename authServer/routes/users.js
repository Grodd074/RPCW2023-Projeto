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

router.post('/register', function(req, res) {
  var data = new Date().toISOString().substring(0,16)
  userModel.register(
    new userModel({ 
      username: req.body.username,
      nome: req.body.nome,
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
    {expiresIn: "1d"},
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

router.put('/password', verificaAcesso, function(req, res){
  User.changePassword(req.body.user, req.body.password, req.body.password2)
  .then(u => {
    res.jsonp(u)
  })
  .catch(erro => {
    res.jsonp({error: erro, message: "Erro na alteração da password do utilizador " + req.user.username})
  })
})


router.get('/:user/favoritos', verificaAcesso, function(req, res){
  User.getFavoritos(req.params.user)
  .then(u => {
    res.jsonp(u.favoritos)
  })
  .catch(erro => {
    res.jsonp({error: erro, message: "Erro na obtenção dos favoritos do utilizador " + req.params.user})
  })
})

router.post('/:user/favoritos', verificaAcesso, function(req, res){
  User.addFavorito(req.params.user, {idRegisto: req.body.id, processo: req.body.processo,descricao: req.body.descricao})
  .then(u => {
    res.jsonp(u)
  })
  .catch(erro => {
    res.jsonp({error: erro, message: "Erro na adição do favorito " + req.body.id + " ao utilizador " + req.params.user})
  })
})

router.delete('/:user/favoritos/:id', verificaAcesso, function(req, res){
  User.removeFavorito(req.params.user, req.params.id)
  .then(u => {
    res.jsonp(u)
  })
  .catch(erro => {
    res.jsonp({error: erro, message: "Erro na remoção do favorito " + req.params.id + " do utilizador " + req.params.user})
  })
})

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

router.put('/:user', verificaAcesso, function(req, res){
  console.log(req.body)
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

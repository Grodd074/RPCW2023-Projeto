var express = require('express');
var router = express.Router();
var Geral = require('../controllers/geral');
var Atco = require('../controllers/atco1');
var Jcon = require('../controllers/jcon');
var Jdgpj = require('../controllers/jdgpj');
var Jsta = require('../controllers/jsta');
var Jstj = require('../controllers/jstj');
var Jtca = require('../controllers/jtca');
var Jtcampca = require('../controllers/jtcampca');
var Jtcampct = require('../controllers/jtcampct');
var Jtcn  = require('../controllers/jtcn');
var Jtrc = require('../controllers/jtrc');
var Jtre = require('../controllers/jtre');
var Jtrg = require('../controllers/jtrg');
var Jtrl = require('../controllers/jtrl');
var Jtrp = require('../controllers/jtrp');
var axios = require('axios')
var jwt = require('jsonwebtoken');
const { mongo, default: mongoose } = require('mongoose');

function verificaAcesso(req, res, next){
    var myToken = req.query.token || req.body.token || req.cookies.token
    if(myToken){
        jwt.verify(myToken, "rpcw2023", function(e, payload){
            if(e){
                res.status(401).render('error', {error: "Acesso negado!"})
            }
            else{
                req.user = payload.username
                req.nivel = payload.level
                req.token = myToken
                next()
            }
        })
    }
    else{
        res.status(401).render('error', {error: "Token inexistente!"})
    }
}

function verificaAdmin(req, res, next){
    var myToken = req.query.token || req.body.token || req.cookies.token
    if(myToken){
        jwt.verify(myToken, "rpcw2023", function(e, payload){
            if(e){
                res.status(401).render('error', {error: "Acesso negado!"})
            }
            else if(payload.level == "admin"){
                req.user = payload.username
                req.nivel = payload.level
                req.token = myToken
                next()
            }
            else{
                res.status(401).render('error', {error: "Acesso negado!"})
            }
        })
    }
    else{
        res.status(401).render('error', {error: "Token Inexistente!"})
    }
}

function verificaLoggedIn(req, res, next){
    var myToken = req.query.token || req.body.token || req.cookies.token
    if(myToken){
        jwt.verify(myToken, "rpcw2023", function(e, payload){
            if(e){
                next()
            }
            else{
                req.token = myToken
                req.user = payload.username
                req.nivel = payload.level
                next()
            }
        })
    }
    else{
        next()
    }
}


/* GET home page. */
router.get('/', verificaLoggedIn, function(req, res, next) {
    //Check if page value was passed
    Geral.taxonomiaDescritores()
    .then(taxonomia => {
        taxonomia = taxonomia.map(d => d.Descritor)
        page = req.query.page
        descritores = req.query.descritores
        tribunais = req.query.tribunais
        search = req.query.search
        fullsearch = req.query.fullsearch
        if (page == undefined) {
            page = 1
        }
        else {
            page = parseInt(page)
        }
        filtros={}
        if (descritores != undefined){
            filtros.Descritores = {$in: descritores.split(",").map(s=>decodeURI(s))}
            descritores = descritores.split(",").map(s=>decodeURI(s))
        }
        else{
            descritores = []
        }
        if (tribunais != undefined){
            filtros.Tribunal = {$in: tribunais.split(",").map(s=>decodeURI(s))}
            tribunais = tribunais.split(",").map(s=>decodeURI(s))
        }
        else{
            tribunais = []
        }
        if (search != undefined){
            filtros.$text = {$search: search}
        }
        filtros.Aceite = {$exists: false}
        Geral.pageFilters(page, filtros)
        .then(dados => {
            Geral.MaxPage(filtros)
            .then(maxPage => {
                Geral.getTribunais()
                .then(tribunaisList => {
                    tribunaisList = tribunaisList.map(t => t.Tribunal)
                    if (req.user){
                        
                        var authServerURL = process.env.AUTHSERVER_URL;
                        if (authServerURL == undefined)
                            authServerURL = "http://localhost:7013"
                        axios.get(authServerURL + '/users/'+req.user+'/favoritos', {params: {token: req.token}})

                        .then(favoritos => {
                            var mapping={}
                            for (i=0; i<favoritos.data.length; i++){
                                mapping[favoritos.data[i].idRegisto] = {}
                                mapping[favoritos.data[i].idRegisto].processo = favoritos.data[i].processo
                                mapping[favoritos.data[i].idRegisto].descricao = favoritos.data[i].descricao
                            }
                            res.render('index', { alista: dados, page: page, maxPage:maxPage, descritores: descritores, taxonomia: taxonomia, tribunais: tribunais, tribunaisList: tribunaisList, user: req.user, nivel: req.nivel, favoritos:mapping});
                        })
                        .catch(e => res.render('error', {error: e}))
                    }
                    else{
                        res.render('index', { alista: dados, page: page, maxPage:maxPage, descritores: descritores, taxonomia: taxonomia, tribunais: tribunais, tribunaisList: tribunaisList, user: req.user, nivel: req.nivel, favoritos:[]});
                    }
                })
                .catch(e => res.render('error', {error: e}))
            })
            .catch(e => res.render('error', {error: e}))
        })
        .catch(e => res.render('error', {error: e}))
    })
    .catch(e => res.render('error', {error: e}))
});

router.get('/acordaos/sugestoes', verificaAdmin, function(req, res, next) {
    page = req.query.page
    if (page == undefined) {
        page = 1
    }
    else {
        page = parseInt(page)
    }
    filtros={}
    filtros.Aceite = {$exists: true}
    Geral.pageFilters(page, filtros)
    .then(dados => {
        Geral.MaxPage(filtros)
        .then(maxPage => {
            res.render('sugestoes', { alista: dados, page: page, maxPage:maxPage, user: req.user, nivel: req.nivel});
        })
        .catch(e => res.render('error', {error: e}))
    })
    .catch(e => res.render('error', {error: e}))
})

router.post('/acordaos/aceitar/:id', verificaAdmin, function(req, res, next) {
    const acordaoId = new mongoose.Types.ObjectId(req.params.id)
    Geral.aceita(acordaoId)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.render('error', {error: e}))
})

router.get('/login', function(req, res, next) {
    res.render('login');
});

router.post('/login', function(req, res, next) {

    var authServerURL = process.env.AUTHSERVER_URL;
    if (authServerURL == undefined)
        authServerURL = "http://localhost:7013"
    axios.post(authServerURL+'/users/login', req.body)
    .then(dados => {
        res.cookie('token', dados.data.token, {
            expires: new Date(Date.now() + '1d'),
            secure: false,
            httpOnly: true,
        });
        res.status(200).redirect('/')
    })
    .catch(e => res.render('error', {error: e}))
});

router.get('/logout', verificaAcesso, function(req, res, next) {
    res.clearCookie('token')
    res.redirect('/')
});

router.get('/register', function(req, res, next) {
    res.render('register');
});

router.post('/register', function(req, res, next) {
    req.body.nivel = "user"

    var authServerURL = process.env.AUTHSERVER_URL;
    if (authServerURL == undefined)
        authServerURL = "http://localhost:7013"
    axios.post(authServerURL+'/users/register', req.body)
    .then(dados => {
        res.redirect('/')
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/acordaos/favorito', verificaAcesso, function(req, res, next) {
    
    var authServerURL = process.env.AUTHSERVER_URL;
    if(authServerURL == undefined)
        authServerURL = "http://localhost:7013"
    axios.post(authServerURL+'/users/'+req.user+'/favoritos', req.body, {params: {token: req.token}})
    .then(dados => {
        res.status(200).jsonp(dados.data)
    })
    .catch(e => res.render('error', {error: e}))
});

router.delete('/acordaos/favorito', verificaAcesso, function(req, res, next) {
    
    var authServerURL = process.env.AUTHSERVER_URL;
    if(authServerURL == undefined)
        authServerURL = "http://localhost:7013"
    axios.delete(authServerURL+'/users/'+req.user+'/favoritos/'+req.body.id, {data: req.body, params: {token: req.token}})
    .then(dados => {
        res.status(200).jsonp(dados.data)
    })
    .catch(e => res.render('error', {error: e}))
});

router.get('/perfil', verificaAcesso, function(req, res, next) {

    var authServerURL = process.env.AUTHSERVER_URL;
    if (authServerURL == undefined)
        authServerURL = "http://localhost:7013"
    axios.get(authServerURL+'/users/'+req.user, {params: {token: req.token}})
    .then(dados => {
        res.render('perfil', {user: dados.data})
    })
    .catch(e => res.render('error', {error: e}))
});

router.put('/perfil', verificaAcesso, function(req, res, next) {
    var favStr = req.body.favoritos
    if (favStr != '[]'){
        req.body.favoritos = favStr.substring(1, favStr.length-1).split(",").map(s=>decodeURI(s).trim())
    }
    else{
        req.body.favoritos = []
    }
    
    var authServerURL = process.env.AUTHSERVER_URL;
    if (authServerURL == undefined)
        authServerURL = "http://localhost:7013"
    axios.put(authServerURL+'/users/'+req.user, req.body, {params: {token: req.token}})
    .then(dados => {
        res.status(200).jsonp(dados.data)   
    })
    .catch(e => res.render('error', {error: e}))
});

router.put("/password", verificaAcesso, function(req, res, next) {
    req.body.user=req.user
    
    var authServerURL = process.env.AUTHSERVER_URL;
    if (authServerURL == undefined)
        authServerURL = "http://localhost:7013"
    axios.put(authServerURL+'/users/password', req.body, {params: {token: req.token}})
    .then(dados => {
        res.status(200).jsonp(dados.data)   
    })
    .catch(e => res.render('error', {error: e}))
});

router.get('/acordaos/registo', verificaAcesso, function(req, res, next) {
    res.render('geralForm')
});

router.get('/acordaos/registo/:tribunal', verificaAcesso, function(req, res, next) {
    res.render(req.params.tribunal+'Form')
});

router.post('/acordaos/registo/:tribunal', verificaAcesso, function(req, res, next) {
    var nivel = req.nivel
    var tribunal = req.params.tribunal
    var controller = getTribunal(tribunal)
    if(nivel == "admin"){
        controller.inserir(req.body)
        .then(dados1 => {
            // Inserir na "gerals"
            Geral.inserirEntrada(req.body, dados1._id)
            .then(dados2 => {
                res.redirect('/acordaos/' + dados2.Id)
            })
            .catch(e => res.render('error', {error: e}))
        })
        .catch(e => res.render('error', {error: e}))
    }
    else{
        var tribunalBody = JSON.parse(JSON.stringify(req.body));
        tribunalBody.Aceite = false;
        var geralBody = JSON.parse(JSON.stringify(req.body));
        geralBody.Aceite = false;
        geralBody.User = req.user;
        controller.inserir(tribunalBody)
        .then(dados1 => {
            /*Inserir dicionario sugestao*/
            Geral.inserirEntrada(geralBody, dados1._id)
            .then(dados2 => {
                res.redirect('/acordaos/' + dados2.Id)
            })
            .catch(e => res.render('error', {error: e}))
        })
        .catch(e => res.render('error', {error: e}))
    }
});

router.get('/acordaos/editar/:IdAcordao', verificaAdmin, function(req, res) {
    const acordaoId = new mongoose.Types.ObjectId(req.params.IdAcordao)
    Geral.consultarId(acordaoId)
    .then(acordao => {
        controller = getTribunal(acordao.Tribunal)
        controller.findById(acordaoId)
        .then(dados => {
            res.render('editar', {dados: dados._doc})
        })
        .catch(e => res.render('error', {error: e}))
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/acordaos/editar/:IdAcordao', verificaAdmin, function(req, res) {
    const acordaoId = new mongoose.Types.ObjectId(req.params.IdAcordao)
    Geral.consultarId(acordaoId)
    .then(acordao => {
        controller = getTribunal(acordao.Tribunal)
        controller.editar(acordaoId, req.body)
        .then(dados => {
            // Inserir na "gerals"
            Geral.editarEntrada(req.body, acordaoId)
            .then(dados2 => {
                res.redirect('/acordaos/' + acordaoId)
            })
            .catch(e => res.render('error', {error: e}))

        })
        .catch(e => res.render('error', {error: e}))
    })
    .catch(e => res.render('error', {error: e}))
});

router.get('/acordaos/:IdAcordao', function(req, res, next) {
    const acordaoId = new mongoose.Types.ObjectId(req.params.IdAcordao)
    Geral.consultarId(acordaoId)
    .then(acordao => {
        tribunal = acordao.Tribunal
        controller = getTribunal(tribunal)
        controller.findById(acordaoId)
        .then(acordao => {
            delete acordao._doc['Normas Julgadas Inconst']
            delete acordao._doc['Normas Declaradas Inconst']
            delete acordao._doc['Nº do Boletim do M']
            delete acordao._doc['Página do Boletim do M']
            delete acordao._doc['Volume dos Acordãos do T']
            delete acordao._doc['1ª Pág']
            delete acordao._doc['Data Dec']
            res.render(tribunal, {a: acordao._doc});
        })
        .catch(erro => {
          res.render('error', {error: erro, message: "Erro 1"})
        })
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro 2"})
    })
});

router.delete('/acordaos/delete/:IdAcordao', function(req, res, next) {
    const acordaoId = new mongoose.Types.ObjectId(req.params.IdAcordao)
    Geral.consultarId(acordaoId)
    .then(acordao => {
        Geral.eliminar(acordao._id)
        .then(ack => {
            processo = acordao.Processo
            tribunal = acordao.Tribunal
            controller = getTribunal(tribunal)
            controller.eliminar(acordaoId)
            .then(ack => {
                res.status(200).jsonp(acordao);
            })
            .catch(erro => {
              res.render('error', {error: erro, message: "Erro 1"})
            })
        })
        .catch(erro => {
            res.render('error', {error: erro, message: "Erro 2"})
        })
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro 2"})
    })
});

/* auxiliar para a tribunal */
function getTribunal(tribunal) {
    if (tribunal == "atco1") {
        return Atco
    }
    else if (tribunal == "jcon") {
        return Jcon
    }
    else if (tribunal == "jdgpj") {
        return Jdgpj
    }
    else if (tribunal == "jsta") {
        return Jsta
    }
    else if (tribunal == "jstj") {
        return Jstj
    }
    else if (tribunal == "jtca") {
        return Jtca
    }
    else if (tribunal == "jtcampca") {
        return Jtcampca
    }
    else if (tribunal == "jtcampct") {
        return Jtcampct
    }
    else if (tribunal == "jtcn") {
        return Jtcn
    }
    else if (tribunal == "jtrc") {
        return Jtrc
    }
    else if (tribunal == "jtre") {
        return Jtre
    }
    else if (tribunal == "jtrg") {
        return Jtrg
    }
    else if (tribunal == "jtrl") {
        return Jtrl
    }
    else if (tribunal == "jtrp") {
        return Jtrp
    } 
}


module.exports = router;

var express = require('express');
var router = express.Router();
var Geral = require('../controllers/geral');
var Atco = require('../controllers/atco1');
var Jcons = require('../controllers/jcons');
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
                res.status(401).jsonp({error: e})
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
        res.status(401).jsonp({error: "Token inexistente!"})
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
        Geral.pageFilters(page, filtros)
        .then(dados => {
            Geral.MaxPage(filtros)
            .then(maxPage => {
                Geral.getTribunais()
                .then(tribunaisList => {
                    tribunaisList = tribunaisList.map(t => t.Tribunal)
                    if (req.user){
                        axios.get('http://localhost:7013/users/'+req.user+'/favoritos', {params: {token: req.token}})
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

router.get('/login', function(req, res, next) {
    res.render('login');
});

router.post('/login', function(req, res, next) {
    axios.post('http://localhost:7013/users/login', req.body)
    .then(dados => {
        res.cookie('token', dados.data.token, {
            expires: new Date(Date.now() + '1d'),
            secure: false, // set to true if your using https
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
    axios.post('http://localhost:7013/users/register', req.body)
    .then(dados => {
        res.redirect('/')
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/acordaos/favorito', verificaAcesso, function(req, res, next) {
    axios.post('http://localhost:7013/users/'+req.user+'/favoritos', req.body, {params: {token: req.token}})
    .then(dados => {
        res.status(200).jsonp(dados.data)
    })
    .catch(e => res.render('error', {error: e}))
});

router.delete('/acordaos/favorito', verificaAcesso, function(req, res, next) {
    axios.delete('http://localhost:7013/users/'+req.user+'/favoritos/'+req.body.id, {data: req.body, params: {token: req.token}})
    .then(dados => {
        res.status(200).jsonp(dados.data)
    })
    .catch(e => res.render('error', {error: e}))
});

router.get('/perfil', verificaAcesso, function(req, res, next) {
    axios.get('http://localhost:7013/users/'+req.user, {params: {token: req.token}})
    .then(dados => {
        console.log(dados.data)
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
    axios.put('http://localhost:7013/users/'+req.user, req.body, {params: {token: req.token}})
    .then(dados => {
        res.status(200).jsonp(dados.data)   
    })
    .catch(e => res.render('error', {error: e}))
});

router.put("/password", verificaAcesso, function(req, res, next) {
    req.body.user=req.user
    axios.put('http://localhost:7013/users/password', req.body, {params: {token: req.token}})
    .then(dados => {
        res.status(200).jsonp(dados.data)   
    })
    .catch(e => res.render('error', {error: e}))
});

router.get('/acordaos/registo', verificaAcesso, function(req, res, next) {
    res.render('geralForm');
});

router.get('/acordaos/registo/atco1', verificaAcesso, function(req, res, next) {
    res.render('atco1Form');
});

router.get('/acordaos/registo/jcons', verificaAcesso, function(req, res, next) {
    res.render('jconsForm');
});

router.get('/acordaos/registo/jdgpj', verificaAcesso, function(req, res, next) {
    res.render('jdgpjForm');
});

router.get('/acordaos/registo/jsta', verificaAcesso, function(req, res, next) {
    res.render('jstaForm');
});

router.get('/acordaos/registo/jstj', verificaAcesso, function(req, res, next) {
    res.render('jstjForm');
});

router.get('/acordaos/registo/jtca', verificaAcesso, function(req, res, next) {
    res.render('jtcaForm');
});

router.get('/acordaos/registo/jtcampca', verificaAcesso, function(req, res, next) {
    res.render('jtcampcaForm');
});

router.get('/acordaos/registo/jtcampct', verificaAcesso, function(req, res, next) {
    res.render('jtcampctForm');
});

router.get('/acordaos/registo/jtcn', verificaAcesso, function(req, res, next) {
    res.render('jtcnForm');
});

router.get('/acordaos/registo/jtrc', verificaAcesso, function(req, res, next) {
    res.render('jtrcForm');
});

router.get('/acordaos/registo/jtre', verificaAcesso, function(req, res, next) {
    res.render('jtreForm');
});

router.get('/acordaos/registo/jtrg', verificaAcesso, function(req, res, next) {
    res.render('jtrgForm');
});

router.get('/acordaos/registo/jtrl', verificaAcesso, function(req, res, next) {
    res.render('jtrlForm');
});

router.get('/acordaos/registo/jtrp', verificaAcesso, function(req, res, next) {
    res.render('jtrpForm');
});


router.post('/acordaos/registo/atco1', verificaAcesso, function(req, res, next) {
    Atco.inserir(req.body)
    .then(dados1 => {
        // Inserir na "gerals"
        Geral.inserirEntrada(req.body, dados1._id)
        .then(dados2 => {
            console.log(dados2)
            res.redirect('/acordaos/' + dados2.Id)
        })
        .catch(e => res.render('error', {error: e}))
    
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/acordaos/registo/jcons', verificaAcesso, function(req, res, next) {
    Jcons.inserir(req.body)
    .then(dados1 => {

        // Inserir na "gerals"
        Geral.inserirEntrada(req.body, dados1._id)
        .then(dados2 => {
            console.log(dados2)
            res.redirect('/acordaos/' + dados2.Id)
        })
        .catch(e => res.render('error', {error: e}))
    
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/acordaos/registo/jdgpj', verificaAcesso, function(req, res, next) {
    Jdgpj.inserir(req.body)
    .then(dados1 => {

        // Inserir na "gerals"
        Geral.inserirEntrada(req.body, dados1._id)
        .then(dados2 => {
            console.log(dados2)
            res.redirect('/acordaos/' + dados2.Id)
        })
        .catch(e => res.render('error', {error: e}))
    
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/acordaos/registo/jsta', verificaAcesso, function(req, res, next) {
    Jsta.inserir(req.body)
    .then(dados1 => {

        // Inserir na "gerals"
        Geral.inserirEntrada(req.body, dados1._id)
        .then(dados2 => {
            console.log(dados2)
            res.redirect('/acordaos/' + dados2.Id)
        })
        .catch(e => res.render('error', {error: e}))
    
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/acordaos/registo/jstj', verificaAcesso, function(req, res, next) {
    Jstj.inserir(req.body)
    .then(dados1 => {

        // Inserir na "gerals"
        Geral.inserirEntrada(req.body, dados1._id)
        .then(dados2 => {
            console.log(dados2)
            res.redirect('/acordaos/' + dados2.Id)
        })
        .catch(e => res.render('error', {error: e}))
    
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/acordaos/registo/jtca', verificaAcesso, function(req, res, next) {
    Jtca.inserir(req.body)
    .then(dados1 => {

        // Inserir na "gerals"
        Geral.inserirEntrada(req.body, dados1._id)
        .then(dados2 => {
            console.log(dados2)
            res.redirect('/acordaos/' + dados2.Id)
        })
        .catch(e => res.render('error', {error: e}))
    
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/acordaos/registo/jtcampca', verificaAcesso, function(req, res, next) {
    Jtcampca.inserir(req.body)
    .then(dados1 => {

        // Inserir na "gerals"
        Geral.inserirEntrada(req.body, dados1._id)
        .then(dados2 => {
            console.log(dados2)
            res.redirect('/acordaos/' + dados2.Id)
        })
        .catch(e => res.render('error', {error: e}))
    
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/acordaos/registo/jtcampct', verificaAcesso, function(req, res, next) {
    Jtcampct.inserir(req.body)
    .then(dados1 => {

        // Inserir na "gerals"
        Geral.inserirEntrada(req.body, dados1._id)
        .then(dados2 => {
            console.log(dados2)
            res.redirect('/acordaos/' + dados2.Id)
        })
        .catch(e => res.render('error', {error: e}))
    
    })
    .catch(e => res.render('error', {error: e}))
});
router.post('/acordaos/registo/jtcn', verificaAcesso, function(req, res, next) {
    Jtcn.inserir(req.body)
    .then(dados1 => {

        // Inserir na "gerals"
        Geral.inserirEntrada(req.body, dados1._id)
        .then(dados2 => {
            console.log(dados2)
            res.redirect('/acordaos/' + dados2.Id)
        })
        .catch(e => res.render('error', {error: e}))
    
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/acordaos/registo/jtrc', verificaAcesso, function(req, res, next) {
    Jtrc.inserir(req.body)
    .then(dados1 => {

        // Inserir na "gerals"
        Geral.inserirEntrada(req.body, dados1._id)
        .then(dados2 => {
            console.log(dados2)
            res.redirect('/acordaos/' + dados2.Id)
        })
        .catch(e => res.render('error', {error: e}))
    
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/acordaos/registo/jtre', verificaAcesso, function(req, res, next) {
    Jtre.inserir(req.body)
    .then(dados1 => {

        // Inserir na "gerals"
        Geral.inserirEntrada(req.body, dados1._id)
        .then(dados2 => {
            console.log(dados2)
            res.redirect('/acordaos/' + dados2.Id)
        })
        .catch(e => res.render('error', {error: e}))
    
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/acordaos/registo/jtrg', verificaAcesso, function(req, res, next) {
    Jtrg.inserir(req.body)
    .then(dados1 => {

        // Inserir na "gerals"
        Geral.inserirEntrada(req.body, dados1._id)
        .then(dados2 => {
            console.log(dados2)
            res.redirect('/acordaos/' + dados2.Id)
        })
        .catch(e => res.render('error', {error: e}))
    
    })
    .catch(e => res.render('error', {error: e}))
});
router.post('/acordaos/registo/jtrl', verificaAcesso, function(req, res, next) {
    Jtrl.inserir(req.body)
    .then(dados1 => {

        // Inserir na "gerals"
        Geral.inserirEntrada(req.body, dados1._id)
        .then(dados2 => {
            console.log(dados2)
            res.redirect('/acordaos/' + dados2.Id)
        })
        .catch(e => res.render('error', {error: e}))
    
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/acordaos/registo/jtrp', verificaAcesso, function(req, res, next) {
    Jtrp.inserir(req.body)
    .then(dados1 => {

        // Inserir na "gerals"
        Geral.inserirEntrada(req.body, dados1._id)
        .then(dados2 => {
            console.log(dados2)
            res.redirect('/acordaos/' + dados2.Id)
        })
        .catch(e => res.render('error', {error: e}))
    
    })
    .catch(e => res.render('error', {error: e}))
});

router.get('/acordaos/editar/:IdAcordao', verificaAcesso, function(req, res) {
    const acordaoId = new mongoose.Types.ObjectId(req.params.IdAcordao)
    Geral.consultarId(acordaoId)
    .then(acordao => {
        controller = getTribunal(acordao.Tribunal)
        controller.findById(acordaoId)
        .then(dados => {
            console.dir(dados._doc)
            res.render('editar', {dados: dados._doc})
        })
        .catch(e => res.render('error', {error: e}))
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/acordaos/editar/:IdAcordao', function(req, res) {
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
          res.render(tribunal, { a: acordao});
        })
        .catch(erro => {
          res.render('error', {error: erro, message: "Erro 1"})
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
    else if (tribunal == "jcons") {
        return Jcons
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

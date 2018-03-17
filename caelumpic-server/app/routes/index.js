var api = require('../api'),
path = require('path');

const JWT = require('jsonwebtoken')

const SECRETKEY = 'HOMEMPASSARO'

const token = JWT.sign(
    { login: 'mario', senha: '123', user: 'admin' },
    SECRETKEY,
    { expiresIn: 1 }
)
console.log('Token fofinho:', token)

JWT.verify(token, SECRETKEY, function(err, tokenDecodificado) {
    console.log('ERROR', tokenDecodificado)
})


module.exports  = function(app) {

app.route('/login')
    .get( (req, res) => {
        loginUsuario = req.query.login
        senhaUsuario = req.query.senha
        const token = JWT.sign(
            { login: loginUsuario, senha: senhaUsuario, user: 'admin' },
            SECRETKEY,
            { expiresIn: 1 }
        )
        res.send(token)
    })
    .post((req, res) => {
        console.log(req)
    })

app.route('/v1/fotos')
    .post(api.adiciona)
    .get(api.lista);

app.route('/v1/fotos/:fotoId')
    .delete(api.remove)
    .get(api.busca)
    .put(api.atualiza);

app.get('/v1/grupos', api.listaGrupos)
app.get('/v1/fotos/grupo/:grupoId', api.listaPorGrupo);
    
app.all('/*', function(req, res) {
    res.sendFile(path.join(app.get('clientPath'), 'index.html'));
});
};
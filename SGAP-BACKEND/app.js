// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Inicializar variables
var app = express();

// Habilitando CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT, OPTIONS");
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Importando rutas
var appRoutes = require('./routes/app');
var loginRoutes = require('./routes/login');
var usuarioRoutes = require('./routes/usuario');
var modeloRoutes = require('./routes/modelo');
var aseguradoraRoutes = require('./routes/aseguradora');
var empresaRoutes = require('./routes/empresa');
var searchRoutes = require('./routes/search');
var uploadRoutes = require('./routes/upload');
var parametroRoutes = require('./routes/parametro');
var cotizacionRoutes = require('./routes/cotizacion');
var clienteRoutes = require('./routes/cliente');
var modeloRiesgoRoutes = require('./routes/modelo_riesgo');
var tasaRoutes = require('./routes/tasa');
var autoRoutes = require('./routes/auto');
var coberturaRoutes = require('./routes/cobertura');
var riesgoRoutes = require('./routes/riesgo');
var slimRoutes = require('./routes/slim');
var gpsRoutes = require('./routes/gps');
var polizaRoutes = require('./routes/poliza');
var usoAseguradoraRoutes = require('./routes/uso_aseguradora');
var viewRamoTecnico = require('./routes/view_ramo_tecnico');
var serveIndex = require('serve-index');

app.use(express.static('/data/sigap/'));
app.use('/uploads', serveIndex('/data/sigap/uploads'));
// app.use(express.static(__dirname + '/'));
// app.use('/uploads', serveIndex(__dirname + '/uploads'));

// Route
app.use('/login', loginRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/modelo', modeloRoutes);
app.use('/empresa', empresaRoutes);
app.use('/aseguradora', aseguradoraRoutes);
app.use('/search', searchRoutes);
app.use('/upload', uploadRoutes);
app.use('/parametro', parametroRoutes);
app.use('/cotizacion', cotizacionRoutes);
app.use('/cliente', clienteRoutes);
app.use('/modeloriesgo', modeloRiesgoRoutes);
app.use('/tasa', tasaRoutes);
app.use('/auto', autoRoutes);
app.use('/cobertura', coberturaRoutes);
app.use('/riesgo', riesgoRoutes);
app.use('/slim', slimRoutes);
app.use('/gps', gpsRoutes);
app.use('/poliza', polizaRoutes);
app.use('/uso_aseg', usoAseguradoraRoutes);
app.use('/v_ramo', viewRamoTecnico);
app.use('/', appRoutes);

// MongoDB Access
var db = require('./config/config').MONGODB;

// Conectandose a MongoDB
mongoose.connect(db.MONGODB_URI, db.MONGOOSE_OPTS, (err) => {
    if (err) { throw err; }
    console.log('Base de datos online: \x1b[32m%s\x1b[0m', 'online');
})

// Escuchar peticiones
app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000: \x1b[32m%s\x1b[0m', 'online');
})
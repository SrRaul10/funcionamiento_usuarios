const express = require('express');
const bodyParser = require('body-parser');
const placesRoutes = require('./routes/places-routes');
const HttpError = require('./models/Http-error');
const app = express();
const userRoutes = require('./routes/user-routes');
app.use(bodyParser.json());
app.use('/api/places', placesRoutes);
app.use('/api/users', userRoutes);
app.use((req, res, next)=>{
    const error = new HttpError('No se encontró la ruta solicitada.', 404);
    throw error;
});
app.use((error, req, res, next) => {
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code||500);
    res.json({errorMessage: error.message}||'Ha ocurrido un error inesperado');
})
app.listen(5000);
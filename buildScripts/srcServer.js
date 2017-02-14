import express from  'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';

/* eslint-disable no-console */

const port =3000;
const app=express();
const compiler = webpack(config);

//use webpack
app.use(require('webpack-dev-middleware')(compiler,{
    noInfo:true,
    publicPath: config.output.publicPath
}));

//express route to index.html
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../src/index.html' ));
}
);

//get users routes
app.get('/users', function(req, res) {
    res.json([
        {"id":1, "firstName":"Bob", "lastName":"Smith", "email":"email1@dom.com" },
        {"id":2, "firstName":"Tammy", "lastName":"Norton", "email":"email2@dom.com" }
    ]
    );
});

//express listens to port
app.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        open('http://localhost:' + port);
    }
});

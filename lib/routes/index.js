module.exports = function(app) {
    app.get('/', function(request, response) {
        response.render('pages/index');
    });

    app.get('/register', function(request, response) {
        response.render('pages/register');
    });

    app.post('/register', function(request, response) {
        console.log('sup');
        console.log(request.body);
    });
}

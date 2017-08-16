module.exports = function(app) {
    app.get('/', function(request, response) {
        response.render('pages/index');
    });

    app.get('/register', function(request, response) {
        response.render('pages/register');
    });

    app.get('/about', function(request, response) {
        response.render('pages/about');
    });

    app.get('/organizer-partners', function(request, response) {
        response.render('pages/organizer-partners');
    });

    app.get('/speakers', function(request, response) {
        response.render('pages/speakers');
    });

    app.get('/vips', function(request, response) {
        response.render('pages/vips');
    });

    app.get('/contact', function(request, response) {
        response.render('pages/contact');
    });
}

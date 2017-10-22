module.exports = function(app, connection) {
    app.get('/', function(request, response) {
        response.render('pages/index');
    });

    app.get('/register', function(request, response) {
        response.render('pages/register', { noAccessCode: true, accessCode: ''});
    });

    app.post('/register', function(request, response) {
        console.log(request.body)
    });

    app.post('/access-code', function(request, response) {
        var accessCode = request.body.accessCode;

        connection.query('SELECT * FROM `access_codes` WHERE `code` = "' + accessCode + '" AND `used`="0"', function (error, results, fields) {
            if (results.length === 0) {
                response.render('pages/register', { noAccessCode: true, accessCode: '', used: true, message: 'Access code has been used or invalid.' });
            } else if (results.length === 0 && error === null) {
                response.render('pages/register', { noAccessCode: true, accessCode: '', invalid: true, message: 'Invalid access code.' });
            } else {
                connection.query('UPDATE `access_codes` SET `used` = "1" WHERE `code`="' + accessCode + '"', function (error, results, fields) {
                    result = 'Updated'
                    response.render('pages/register', { noAccessCode: false, accessCode: accessCode });
                });
            }
        });
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

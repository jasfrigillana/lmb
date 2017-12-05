module.exports = function(app, connection) {
    app.get('/', function(request, response) {
        response.render('pages/index');
    });

    app.get('/register', function(request, response) {
        response.render('pages/register', { noAccessCode: true, accessCode: ''});
    });

    app.post('/register', function(request, response) {
        var firstName = request.body.firstName;
        var middleName = request.body.middleName;
        var lastName = request.body.lastName;
        var nickname = request.body.nickname;
        var position = request.body.position;
        var organization = request.body.organization;
        var emailAddress = request.body.emailAddress;
        var alternateEmailAddress = request.body.alternateEmailAddress;

        connection.query

        connection.query('INSERT INTO user (first_name, middle_name, last_name, nickname, position, organization, email_address, alternate_email_address) '
            + 'VALUES ("' + firstName + '", "' + middleName + '", "' + lastName + '", "' + nickname + '", "' + position  + '", "' + organization + '", "' 
            + emailAddress + '", "' + alternateEmailAddress + '")',
            function (error, results, fields) {
                connection.query('SELECT LAST_INSERT_ID()', function (error, results, fields) {
                    console.log('error')
                    console.log(error)
                    console.log('results')
                    console.log(results)
                    console.log('fields')
                    console.log(fields)
                });
        });
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

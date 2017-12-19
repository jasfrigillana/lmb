module.exports = function(app, connection, nodemailer) {
    app.get('/', function(request, response) {
        response.render('pages/index');
    });

    app.get('/register', function(request, response) {
        response.render('pages/register', { noAccessCode: true, accessCode: '', registered: false });
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
        var country = request.body.country;
        var province = request.body.province;
        var city = request.body.city;
        var barangay = request.body.barangay;
        var street = request.body.street;
        var postalCode = request.body.postalCode;
        var mobile = request.body.mobile;
        var telephone = '(' +request.body.areaCode + ') ' + request.body.telephone;
        var title = request.body.title;

        /*connection.query('SELECT id FROM `title` WHERE `description` = "' + title + '"', function (error, results, fields) {
        console.log(results);
        });
*/
        connection.query('INSERT INTO contact (mobile, telephone) VALUES ("'+ mobile +'","' + telephone +'")',
            function (error, results, fields) {
                var contactId = results.insertId;

                connection.query('INSERT INTO address (country, province, city, barangay, street, postal_code) VALUES ("' + country + '", "' + province + '", "'
                    + city + '", "' + barangay + '", "' + street  + '", "' + postalCode + '")',
                    function (error, results, fields) {
                        var addressId = results.insertId;

                        connection.query('INSERT INTO user (first_name, middle_name, last_name, nickname, position, organization, email_address, alternate_email_address, address_id, contact_id) '
                            + 'VALUES ("' + firstName + '", "' + middleName + '", "' + lastName + '", "' + nickname + '", "' + position  + '", "' + organization + '", "'
                            + emailAddress + '", "' + alternateEmailAddress + '", "' + addressId + '", "' + contactId + '")',
                            function (error, results, fields) {
                              nodemailer.createTestAccount((err, account) => {

                                  // create reusable transporter object using the default SMTP transport
                                  var transporter = nodemailer.createTransport({
                                      host: 'smtp.gmail.com',
                                      port: 587,
                                      secure: false, // true for 465, false for other ports
                                      auth: {
                                          user: 'jasyfrigi@gmail.com',
                                          pass: 'Vansoffthewall'
                                      }
                                  });

                                  var registration = {
                                      from: 'jasyfrigi@gmail.com', // sender address
                                      to: emailAddress, // list of receivers
                                      subject: 'Registration', // Subject line
                                      text: 'Greetings!' +
                                        'Thank you for your registration to the National Land Summit 2018! You will be notified ' +
                                        'once your office confirmed your participation in this event.' +
                                        'Very truly yours,' +
                                        'Web Team National Land Summit 2018', // plain text body
                                      html: 'Greetings! <br/><br/>'+
                                        'Thank you for your registration to the National Land Summit 2018! You will be notified ' +
                                        'once your office confirmed your participation in this event.<br/><br/>' +
                                        'Very truly yours,<br/><br/>' +
                                        'Web Team<br/>National Land Summit 2018'
                                  };

                                  // send mail with defined transport object
                                  transporter.sendMail(registration, (error, info) => {
                                      if (error) {
                                          console.log(error);
                                      }
                                      console.log('Message sent: %s', info.messageId);
                                  });

                                  response.render('pages/register', { noAccessCode: true, accessCode: '', registered: true });
                              });
                        });
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

$(document).ready(function() {
    $('.success').hide();
    var database = firebase.database();

    function writeUserData(details) {
        database.ref('users/' + details.nickname).set(details)
            .then(function() {
                console.log('Registered!');
                $('.success').show();
                document.getElementById("register").reset();
                $("html, body").animate({ scrollTop: 0 }, "slow");
            })
            .catch(function() {
                console.log('Failed to register!');
            });
    }

    $('#register').submit(function(event) {
        var details = [];
        // For email verification
        details['verified'] = false;

        $('#register input, #register select').each(
            function(index) {
                var input = $(this);
                if (input.attr('name') === 'areaCode') {
                    details['telephoneNumber'] = '(' + input.val() + ')';
                } else if (input.attr('name') === 'telephone') {
                    details['telephoneNumber'] += ' ' + input.val();
                } else {
                    details[input.attr('name')] = input.val();
                }

                event.preventDefault();
            }
        );

        writeUserData(details);
    });
});

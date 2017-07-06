$(document).ready(function() {
    var database = firebase.database();

    function writeUserData(details) {
        	database.ref('users/' + details.nickname).set(details)
            .then(function() {
                alert('Registered!');
            })
            .catch(function() {
                alert('Failed to register!');
            });
    }

    $('#register').submit(function(event) {
        var details = [];

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

        console.log(details);
    });
});

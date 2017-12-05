$(document).ready(function() {
    $('.error').hide();

    function writeUserData(details) {
        var mobile = $('#mobile').val();

        if (!/^(\+63|0)?9\d{9}$/.test(mobile)) {
            $('#error-message').html('<strong>Please check fields. Error in processing request.</strong>');
            $('.error-mobile').html('Invalid format.');
            $('.error-mobile').show();
            $('.error').show();
            $('html, body').animate({
                scrollTop: 0
            }, 'slow');
        } else {
            $.ajax({
                type: "POST",
                url: "/register",
                data: details,
                success: function() { console.log("test") },
                dataType: "json"
            });
            // count = getTotal();

            // setTimeout(function() {
            //     if (count === 500) {
            //         document.getElementById("btn-register").disabled = true;
            //         $('#btn-register').addClass('disabled');
            //         $('#error-message').html('<strong>Failed to register. Limit of 500 people only for the seminar.</strong>');
            //         $('.error').show();
            //         $('html, body').animate({
            //             scrollTop: 0
            //         }, 'slow');
            //     } else {
            //         database.ref('users/' + details.nickname).set(details)
            //             .then(function() {
            //                 console.log('Registered!');
            //                 $('.success').show();
            //                 document.getElementById('register').reset();
            //                 $('html, body').animate({
            //                     scrollTop: 0
            //                 }, 'slow');
            //             })
            //             .catch(function() {
            //                 console.log('Failed to register!');
            //             });
            //     }
            // }, 3000);
        }
    }

    // $('#register').submit(function(event) {
    //     var details = [];
    //     // For email verification
    //     details['verified'] = false;

    //     $('#register input, #register select').each(
    //         function(index) {
    //             var input = $(this);
    //             if (input.attr('name') === 'areaCode') {
    //                 details['telephoneNumber'] = '(' + input.val() + ')';
    //             } else if (input.attr('name') === 'telephone') {
    //                 details['telephoneNumber'] += ' ' + input.val();
    //             } else {
    //                 details[input.attr('name')] = input.val();
    //             }

    //             event.preventDefault();
    //         }
    //     );

    //     writeUserData(details);
    // });
});
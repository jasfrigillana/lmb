var database = firebase.database();
console.log(database);

$(document).ready(function() {
    $('#register').submit(function(event) {
        var details = [];

        $('#register input, #register select').each(
            function(index) {
                var input = $(this);
                details[input.attr('name')] = input.val();
                event.preventDefault();
            }
        );

        console.log(details);
    });
});

$(function(){

    $.get('/cities', appendToList);

    $('#myForm').on('submit', function (event) {
       event.preventDefault();

       var form = $(this);
       var cityData = form.serialize();

       $.ajax({
           'type': 'POST',
           'url': '/cities',
           'data': cityData
       }).fail(function () {
           console.log("Error");
       }).done(function (cityName) {
           appendToList([cityName]);
           form.trigger('reset');
       });
    });

    function appendToList(cities) {
        var list = [];
        var content, city;
        for(var i in cities){
            city = cities[i];
            content = '<a href="/cities/'+city+'">'+city+'</a><br><button type="button" class="city-del-btn" data-city="' + city + '">Delete</button>';
            list.push($('<li>', { html: content }));
        }
        $('.city-list').append(list);
        
        $('.city-del-btn').on('click', function(event) {
            console.log("Clicked Delete button");
            var target = $(this).attr('data-city');
            $.ajax({
                'type': 'DELETE',
                'url': '/cities/' + target
            }).fail(function(){
                console.log("Error in deleting data");
            }).done(function() {
                var elem = event.target;
                $(elem).parents('li').remove();
            });
        });
    }

});

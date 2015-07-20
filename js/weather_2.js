$(document).ready(function() {

    var unit = "metric"
    $('.a').click(function() {
        alert(unit);
        //weather()
        unit = 'farenheit';
        alert(unit);
        //weather()
    })


    $.get("http://ipinfo.io", function(location) {
        var locationRaw = location.loc
        console.log(locationRaw)
        weather(locationRaw)


    }, "jsonp");

    function weather(loc) {

        var splitLocation = loc.split(",")
        console.log(splitLocation)
        var lat = splitLocation[0]
        var lon = splitLocation[1]
        console.log(lat)
        var app = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon
        var API = "&APPID=30e7fbf08091bfdf0960d7e2a988e9f9&units="
        var consume = app + API
        console.log(app)
        $.getJSON(consume + unit, function(data) {})
            .done(function(data) {
                console.log(data)
                    //city
                $('.city').append("Hello " + data.name)
                    //weather
                function capitalizeFirstLetter(string) {
                    return string.charAt(0).toUpperCase() + string.slice(1);
                }
                var weather = data.weather[0].description
                weather = capitalizeFirstLetter(weather)
                $('.mdl-card__supporting-text.weather').append(weather)

                //temp. must be a better way of writing this, ugh
                var aveLogo = '<i class="fa fa-star"></i>'
                var maxLogo = '<i class="fa fa-arrow-up"></i>'
                var minLogo = '<i class="fa fa-arrow-down"></i>'

                if (unit === 'metric') {
                    var temp = aveLogo + " " + data.main.temp + "&deg;C"
                    var tempH = maxLogo + " " + data.main.temp_max + "&deg;C"
                    var tempL = minLogo + " " + data.main.temp_min + "&deg;C"
                } else {
                    var temp = aveLogo + " " + data.main.temp + "&deg;F"
                    var tempH = maxLogo + " " + data.main.temp_max + "&deg;F"
                    var tempL = minLogo + " " + data.main.temp_min + "&deg;F"
                }
                $('.temp').append(temp)
                $('.tempH').append(tempH)
                $('.tempL').append(tempL)

                //cloud (i miss you...)
                $('.cloudiness').append(data.clouds.all + "%")

                //Sunrise and sunset
                var sunrise = new Date(data.sys.sunrise * 1000)
                $('.sunrise').append(sunrise)
                var sunset = new Date(data.sys.sunset * 1000)
                $('.sunset').append(sunset)
                console.log(sunset)

                //Humidity
                $('.humidity').append(data.main.humidity + "%")

                //URL
                console.log(data.id)

/* TO DO: center wording, city instead of country?, check mobile responsiveness, clean up js. 
*/ 



            })
    }
})
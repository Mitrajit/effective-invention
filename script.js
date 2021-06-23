let weather ={
    fetchWeather: function(city){
        fetch("https://effective-invention.herokuapp.com/api/search?q="+city
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data.results));
    },

    displayWeather: function(data){
        const { name } =data;
        const { icon,description } = data.weather[0];
        const{ temp,humidity } = data.main;
        const{ speed } = data.wind;
        console.log(name,icon,description,temp,humidity,speed);
        document.querySelector(".city").innerText = "Weather in "+name;
        document.querySelector(".icon").src="http://openweathermap.org/img/w/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + " °C";
        document.querySelector(".humidity").innerText = "Humidity:"+ humidity+"%";
        document.querySelector(".wind").innerText ="Wind Speed: " + speed + " Kmph";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+ name +"')";

    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click",function(){
    weather.search();

});

document.querySelector(".search-bar").addEventListener("keyup",function(event){
    if(event.key == "Enter"){
        weather.search();
    }
    });

fetch("https://ipapi.co/json")
    .then((response) => response.json())
    .then((data) => weather.fetchWeather(data.city)
);
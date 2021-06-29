window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection= document.querySelector('.temperature');
    let temperatureSpan= document.querySelector('.temperature span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'http://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/b378e9756e1860a110eb29deb7c15921/${lat},${long}`;
            fetch(api).then(response => {
                return response.json();
            }).then(data => {
                console.log(data);
                const { temperature, summary, icon } = data.currently;
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                let celcius=(temperature -32)*(5/9);

                setIcons(icon, document.querySelector('.icon'));

                temperatureSection.addEventListener('click',()=>{
                    if(temperatureSpan.textContent==="F"){
                        temperatureSpan.textContent="C";
                        temperatureDegree.textContent= Math.floor(celcius);
                    }
                    else{
                        temperatureSpan.textContent="F";
                        temperatureDegree.textContent = temperature;
                    }
                })
            });
        });
    } 
    function setIcons(icon,iconId){
        const skycons=new Skycons({color:'white'});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconId,Skycons[currentIcon]);
    }
});
let dataset;
let x = true


function handleClick() {

    function successCallback(position) {
        console.log(position)

        let lon = Math.trunc(position.coords.longitude)
        let lat = Math.trunc(position.coords.latitude)

        console.log(lat, lon)

        let req = new XMLHttpRequest
        req.open('GET', 'https://weather-proxy.freecodecamp.rocks/api/current?lon='+lon+'&lat='+lat, false)
        req.send()
        dataset=JSON.parse(req.responseText)

        function compass(deg) {
            if (337.5 <= deg < 22.5) {
                return 'N'
            } else if (15 <= deg < 67.5) {
                return 'NW'
            } else if (67.5 <= deg < 112.5) {
                return 'W'
            } else if (112.5 <= deg < 157.5) {
                return 'SW'
            } else if (157.5 <= deg < 202.5) {
                return 'S'
            } else if (202.5 <= deg < 247.5) {
                return 'SE'
            } else if (247.5 <= deg < 292.5) {
                return 'E'
            } else if (292.5 <= deg < 337.5) {
                return 'NE'
            }

        }

        dataset.wind.direction = compass(dataset.wind.deg)

        console.log(dataset)

        document.querySelector('#feelsLike').innerHTML = dataset.main.feels_like+' °C'
        document.querySelector('#humidity').innerHTML = dataset.main.humidity+'%'
        document.querySelector('#temperture').innerHTML = dataset.main.temp+' °C'
        document.querySelector('#todayLow').innerHTML = dataset.main.temp_min+' °C'
        document.querySelector('#todayHigh').innerHTML = dataset.main.temp_max+' °C'
        document.querySelector('#pressure').innerHTML = dataset.main.pressure+' Pascals'
        document.querySelector('#clouds').innerHTML = dataset.weather[0].description
        document.querySelector('#windSpeed').innerHTML = dataset.wind.speed+' kph'
        document.querySelector('#windDirection').innerHTML = dataset.wind.direction
        
        document.querySelector('#weatherButton').innerHTML = 'Convert to Celcius'

        if (x == true) {
            console.log('fire')
            x = false
            let fButton = document.createElement('div')
            fButton.setAttribute('class', 'button')
            fButton.setAttribute('onclick', 'toF()')
            fButton.innerHTML = 'Convert to Farenheit'
            document.querySelector('#main').appendChild(fButton)
        }
    }

    function errorCallback(err) {
        console.log(err)
    }

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)

}

function convertF(numC) {
    return (Math.round((((numC*9)/5)+32)*100))/100
}

function toF() {
    let datasetF = {}

    datasetF.feels_like = convertF(dataset.main.feels_like)
    datasetF.temp = convertF(dataset.main.temp)
    datasetF.temp_min = convertF(dataset.main.temp_min)
    datasetF.temp_max = convertF(dataset.main.temp_max)
    datasetF.speed = dataset.wind.speed*1.609

    document.querySelector('#feelsLike').innerHTML = datasetF.feels_like+' °F'
    document.querySelector('#temperture').innerHTML = datasetF.temp+' °F'
    document.querySelector('#todayLow').innerHTML = datasetF.temp_min+' °F'
    document.querySelector('#todayHigh').innerHTML = datasetF.temp_max+' °F'
    document.querySelector('#windSpeed').innerHTML = (Math.round(datasetF.speed)*100)/100+' mph'
}
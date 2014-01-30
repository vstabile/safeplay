var kitToken = "cdm7vrse7y0o";

var loadingElement = document.querySelector("#loading-conditions"),
    temperatureElement = document.querySelector("#temperature"),
    humidityElement = document.querySelector("#humidity"),
    heatIndexElement = document.querySelector("#heat-index");

window.onload = function () {
    var xhr = new XMLHttpRequest({mozSystem: true});
    xhr.open("GET", "http://dca.telefonicabeta.com/m2m/v2/services/" + kitToken +
        "/assets/" + kitToken +
        "/data/?limit=10&sortBy=!samplingTime", true);
    xhr.onreadystatechange = function () {
        loadingElement.classList.add("hidden");

        if (xhr.status === 200 && xhr.readyState === 4) {
            data = latestData(xhr.response);
            displayData(data);
        }
    }

    xhr.onerror = function () {
        alert("Connection error");
    };

    xhr.send();
}

function latestData(jsonStringData) {
    data = {
        temperature: {
            values: [],
            timestamps: []
        },
        humidity: {
            values: [],
            timestamps: []
        },
        heatIndex: {
            values: [],
            timestamps: []
        }
    }

    rawJsonData = JSON.parse(jsonStringData).data;
    length = rawJsonData.length
    for(var i = 0; i < length; i++) {
        if (rawJsonData[i].ms.p == "temperature") {
            data.temperature.values.push(rawJsonData[i].ms.v);
            data.temperature.timestamps.push(rawJsonData[i].st);
        } else if (rawJsonData[i].ms.p == "relativeHumidity") {
            data.humidity.values.push(rawJsonData[i].ms.v);
            data.humidity.timestamps.push(rawJsonData[i].st);
        }
    }

    length = data.temperature.values.length
    for(var i = 0; i < length; i++) {
        data.heatIndex.values[i] = calculateHeatIndex(data.temperature.values[i], data.humidity.values[i])
        data.heatIndex.timestamps[i] = data.temperature.timestamps[i];
    }

    return data
}

function calculateHeatIndex(T, H) {
    // convert Celsius to Fahrenheit
    var T = 1.8*T + 32;

    var c1 = -42.379,
        c2 = 2.04901523,
        c3 = 10.14333127,
        c4 = -0.22475541,
        c5 = -0.00683783,
        c6 = -0.05481717,
        c7 = 0.00122874,
        c8 = 0.00085282,
        c9 = -0.00000199;

    var HI = c1 + c2*T + c3*H + c4*T*H +
         c5*Math.pow(T,2) + c6*Math.pow(H,2) +
         c7*Math.pow(T,2)*H + c8*T*Math.pow(H,2) +
         c9*Math.pow(T,2)*Math.pow(H,2);

    // convert Fahrenheit to Celsius
    HI = (HI - 32)*0.555555556;

    return HI
}

function displayData(data) {
    temperatureElement.innerHTML = data.temperature.values[0];
    humidityElement.innerHTML = data.humidity.values[0];
    heatIndexElement.innerHTML = Math.round(data.heatIndex.values[0]);
    if (data.heatIndex.values[0] <= 27) {
        document.querySelector("#white-zone").classList.add("display");
    } else if (data.heatIndex.values[0] <= 37) {
        document.querySelector("#yellow-zone").classList.add("display");
    } else if (data.heatIndex.values[0] <= 41) {
        document.querySelector("#orange-zone").classList.add("display");
    } else if (data.heatIndex.values[0] <= 46) {
        document.querySelector("#red-zone").classList.add("display");
    } else {
        document.querySelector("#black-zone").classList.add("display");
    }
}
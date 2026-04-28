/*************************************************
 * BASIC GAME DATA
 *************************************************/

// ✅ Days of operation
var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// ✅ Possible weather types
var weatherTypes = [
    "Sunny",
    "Partly Sunny",
    "Cloudy",
    "Raining",
    "Thunderstorm",
    "Snowing",
    "Foggy"
];

// ✅ Weather that causes ZERO sales
var badWeather = ["Raining", "Thunderstorm", "Snowing", "Foggy"];

// ✅ Temperature range (Fahrenheit)
var minTemp = 32;
var maxTemp = 110;

// ✅ Cost to make one glass of lemonade
var lemonadeCost = 0.5;

// ✅ Stores temperature for each day
var dailyTemp = [];

// ✅ Button click listener (starts the game)
document.getElementById("OpenTheStand").addEventListener("click", openTheStand);

// ✅ Create the weather forecast when page loads
generateWeather();

/*************************************************
 * CREATE WEATHER FORECAST
 *************************************************/
function generateWeather() {
    for (var i = 0; i < days.length; i++) {
        // ✅ Pick random weather
        var todayWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];

        // ✅ Pick random temperature
        var todayTemp = Math.floor(Math.random() * (maxTemp - minTemp) + minTemp);

        // ✅ Save temp for sales math
        dailyTemp[i] = todayTemp;

        // ✅ Create weather card in HTML
        document.getElementById("5DayWeather").innerHTML +=
            "<div id='" + days[i] + "' class='" + todayWeather + "'>" +
            "<strong>" + days[i] + "</strong><br><br>" +
            todayWeather + "<br>" +
            todayTemp + "°F" +
            "</div>";
    }
}

/*************************************************
 * MAIN GAME LOGIC
 *************************************************/
function openTheStand() {
    // ✅ Clear old results
    document.getElementById("result").innerHTML = "";

    // ✅ Get player input
    var numGlasses = Number(document.getElementById("numGlasses").value);
    var glassPrice = Number(document.getElementById("glassPrice").value);

    var totalSold = 0;

    // ✅ Loop through each day
    for (var i = 0; i < days.length; i++) {
        var soldToday = 0;

        // ✅ Find weather class on the day div
        var todayWeather = document.getElementById(days[i]).className;

        // 🚫 BAD WEATHER = NO SALES
        if (badWeather.includes(todayWeather)) {
            soldToday = 0;
        } else {
            // ✅ Sales depend on temperature and price
            soldToday = Math.floor(dailyTemp[i] / glassPrice);
        }

        // ✅ Don’t sell more than we made
        var remaining = numGlasses - totalSold;
        if (soldToday > remaining) {
            soldToday = remaining;
        }

        totalSold += soldToday;

        // ✅ Display daily sales
        document.getElementById("result").innerHTML +=
            "<p>" + days[i] +
            ": Sold " + soldToday +
            " glasses</p>";
    }

    // ✅ Weekly summary
    showResults(numGlasses, glassPrice, totalSold);
}

/*************************************************
 * FINAL RESULTS (Weekly summary)
 *************************************************/
function showResults(stock, price, sold) {
    // ✅ Calculate money and leftovers
    var revenue = sold * price;              // Money earned
    var expenses = stock * lemonadeCost;     // Money spent making lemonade
    var profit = revenue - expenses;         // Net profit
    var leftover = stock - sold;             // Glasses not sold

    // ✅ Print summary
    document.getElementById("result").innerHTML +=
        "<hr>" +
        "<p>Total sold: " + sold + "</p>" +
        "<p>Revenue: $" + revenue.toFixed(2) + "</p>" +
        "<p>Expenses: $" + expenses.toFixed(2) + "</p>" +
        "<p>Leftover glasses: " + leftover + "</p>" +
        "<p><strong>Profit: $" + profit.toFixed(2) + "</strong></p>";
}

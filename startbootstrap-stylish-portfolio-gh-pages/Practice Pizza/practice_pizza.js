// ------------------------------------
// BUTTON CLICK LISTENER
// ------------------------------------

// Find the "Place Order" button
// When it is clicked, run the placeOrder function
document.getElementById("placeOrder")
        .addEventListener("click", placeOrder);


// ------------------------------------
// MAIN FUNCTION
// ------------------------------------

function placeOrder() {

    // Get values from the form

    // How many pizzas the user wants
    var numPizzas = document.getElementById("numPizzas").value;

    // What type of pizza was selected
    var typePizza = document.getElementById("typePizza").value;

    // Which city was selected
    var deliveryCity = document.getElementById("deliveryCity").value;

    // Is it the user's birthday?
    var birthday = document.getElementById("birthday").value;


    // Calculate prices

    // Calculate the price of the pizzas
    var orderPrice = calculatePrice(numPizzas, typePizza);

    // Calculate the delivery fee
    var deliveryPrice = calculateDelivery(deliveryCity, birthday);


    // Build output message

    var theOutput = "<p>Thank you for your order.</p>";

    // Show delivery message
    if (deliveryPrice === 0) {
        theOutput += "<p>You get free delivery!</p>";
    } else {
        theOutput += "<p>Delivery cost: $" + deliveryPrice + "</p>";
    }

    // Show total price
    theOutput += "<p>Your total is: $" + (orderPrice + deliveryPrice) + "</p>";


    // Display the output on the page
    document.getElementById("displayTotal").innerHTML = theOutput;
}


// ------------------------------------
// CALCULATE PIZZA PRICE
// ------------------------------------

function calculatePrice(numPizzas, typePizza) {

    // Base price per pizza
    var pricePerPizza = 10;

    // Add extra cost based on pizza type
    // ONLY ONE of these can run (safe for beginners)

    if (typePizza === "veggie") {
        pricePerPizza += 1;
    } else if (typePizza === "bbq") {
        pricePerPizza += 2;
    } else if (typePizza === "hawaiian") {
        pricePerPizza += 2;
    } else if (typePizza === "supreme") {
        pricePerPizza += 3;
    } else {
        // Cheese or pepperoni = no extra charge
    }

    // Total pizza cost
    var orderPrice = Number(numPizzas) * pricePerPizza;

    // Send the price back
    return orderPrice;
}


// ------------------------------------
// CALCULATE DELIVERY PRICE
// ------------------------------------

function calculateDelivery(deliveryCity, birthday) {

    // Birthday always gets free delivery
    if (birthday === "yes") {
        return 0;
    }

    // Delivery fee based on city
    if (deliveryCity === "Anytown") {
        return 0;
    } else if (deliveryCity === "Sacramento") {
        return 5;
    } else if (deliveryCity === "Los Angeles") {
        return 7;
    } else if (deliveryCity === "San Diego") {
        return 8;
    } else if (deliveryCity === "Beverly Hills") {
        return 10;
    } else if (deliveryCity === "San Francisco") {
        return 12;
    } else if (deliveryCity === "Fresno") {
        return 6;
    } else {
        // Safety fallback
        return 5;
    }
}

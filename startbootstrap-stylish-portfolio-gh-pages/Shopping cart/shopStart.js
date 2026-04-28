// ================================
// ARRAYS HOLD ALL OUR SHOP DATA
// ================================

// Item numbers (just labels for each product)
var nums = [1, 2, 3, 4];

// Item names (what the products are called)
var items = ["Coke", "Kit Kat", "Bar One", "Fanta"];

// Item prices (how much each product costs)
var prices = [7.5, 9.5, 8.5, 7.5];

// Quantities (how many of each product the user has chosen)
// Starts at 0 because nothing is selected yet
var quantities = [0, 0, 0, 0];

// Totals (price × quantity for each product)
// Starts at 0 because nothing is selected yet
var totals = [0.0, 0.0, 0.0, 0.0];


// ==================================
// FUNCTION TO ADD AN ITEM
// ==================================
function add_selection(x) {
    // x = index number of the product (0 = Coke, 1 = Kit Kat, etc.)

    // Increase the quantity of the chosen product by 1
    quantities[x]++;

    // Update the total price for that product
    totals[x] = prices[x] * quantities[x];

    // Refresh the table so the user sees the new quantity and total
    display_all();
}


// ==================================
// FUNCTION TO REMOVE AN ITEM
// ==================================
function remove_selection(x) {
    // x = index number of the product

    // IMPORTANT: Don’t let quantity go below 0
    if (quantities[x] > 0) {
        // Reduce the quantity by 1
        quantities[x]--;

        // Update the total price for that product
        totals[x] = prices[x] * quantities[x];
    }

    // Refresh the table so the user sees the changes
    display_all();
}


// ==================================
// CHECKOUT FUNCTION
// Calculates the grand total of the cart
// ==================================
function checkout() {
    var totalOrderAmt = 0; // Start at 0

    // Add up all product totals
    for (var i = 0; i < totals.length; i++) {
        totalOrderAmt += totals[i];
    }

    // Show the final total on the page
    document.getElementById("total").innerHTML =
        "Total Amount: R" + totalOrderAmt.toFixed(2);
}


// ==================================
// DISPLAY FUNCTION
// Builds the shopping table dynamically
// ==================================
function display_all() {
    var myTable = "<table>";

    // Table headers (top row labels)
    myTable += "<tr>";
    myTable += "<th>Num</th>";
    myTable += "<th>Item</th>";
    myTable += "<th>Price</th>";
    myTable += "<th>Quantity</th>";
    myTable += "<th>Total</th>";
    myTable += "<th>Add</th>";
    myTable += "<th>Remove</th>";
    myTable += "</tr>";

    // Loop through all products
    for (var i = 0; i < items.length; i++) {
        myTable += "<tr>";

        // Show product details
        myTable += "<td>" + nums[i] + "</td>"; // Product number
        myTable += "<td>" + items[i] + "</td>"; // Product name
        myTable += "<td>R" + prices[i].toFixed(2) + "</td>"; // Price
        myTable += "<td>" + quantities[i] + "</td>"; // Quantity chosen
        myTable += "<td>R" + totals[i].toFixed(2) + "</td>"; // Total price

        // Add button (calls add_selection)
        myTable += "<td><button class='add-btn' onclick='add_selection(" + i + ")'>Add</button></td>";

        // Remove button (calls remove_selection)
        myTable += "<td><button class='remove-btn' onclick='remove_selection(" + i + ")'>Remove</button></td>";

        myTable += "</tr>";
    }

    myTable += "</table>";

    // Insert the table into the page (inside the <div id="demo">)
    document.getElementById("demo").innerHTML = myTable;
}


// ==================================
// WHEN PAGE LOADS
// Show the table immediately
// ==================================
window.onload = function () {
    display_all(); // Build and show the table as soon as the page opens
};

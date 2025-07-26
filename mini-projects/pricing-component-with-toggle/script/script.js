const prices = {
  monthly: [19.99, 24.99, 39.99],
  annually: [199.99, 249.99, 399.99],
};

const userPerferrence = localStorage.getItem("billingToggle") || "monthly";
console.log(userPerferrence);

const inputCheckbox = document.getElementById("billing-toggle");
// Dom elements for prices
const priceElements = document.querySelectorAll(".price");

// Function to update the prices based on the toggle state
function updatePrices() {
    console.log(inputCheckbox.checked);
    
    if(inputCheckbox.checked) {
        // If toggle is checked, set prices to annually
        priceElements.forEach((element, index) => {
            element.textContent = `$${prices.annually[index]}`;
        });
    }
    else {
        // If toggle is unchecked, set prices to monthly
        priceElements.forEach((element, index) => {
            element.textContent = `$${prices.monthly[index]}`;
        });
    }
    // Save the user preference in localStorage
    localStorage.setItem('billingToggle', inputCheckbox.checked ? 'annually' : 'monthly');
}

function initializePrices() {
    // Set the initial prices based on user preference
    if(userPerferrence === "annually") {
        inputCheckbox.checked = true;
        updatePrices();
    } else {
        inputCheckbox.checked = false;
        updatePrices();
    }
}
initializePrices()
// add event listener to the checkbox
 inputCheckbox.addEventListener("change",updatePrices)


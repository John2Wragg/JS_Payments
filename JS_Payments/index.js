const saveButton = document.getElementById("input-btn")
const deleteButton = document.getElementById("delete-btn")
const textInput = document.getElementById("input-text-el")
const valueInput = document.getElementById("input-value-el")
const spendText = document.getElementById('spend-el')
const remainingText = document.getElementById('remaining-el')
let myTransactions = {}
let listUL = document.getElementById('ul-el')
let PaymentsGlobal
let totalSpend
let totalRemaining
const Allowance = 200

// Click save button and add key and value to local storage object.
saveButton.addEventListener("click", function(){
    let Note = textInput.value
    let Value = valueInput.value
    myTransactions[Note] = Value
    localStorage.setItem("Transactions",JSON.stringify(myTransactions))
    console.log(myTransactions) 
    renderList()
    SumOfPayments()

})

// Output the key value pairs from JS object to UL in html.
function renderList() {
    listItems = ""
    Object.keys(myTransactions).forEach(function(key){
        listItems += `<li> ${key} : ${myTransactions[key]} </li>`
    })
    listUL.innerHTML = listItems
}

// Sum of all values in array
function SumOfPayments(){
    payments = []
    Object.keys(myTransactions).forEach(function(key){
        payments.push(Number(myTransactions[key]))
    })
    PaymentsGlobal = payments
    console.log(PaymentsGlobal)
    const sum = payments.reduce((partialSum, a) => partialSum + a, 0);
    totalSpend = sum
    spendText.innerHTML = "Total Spent: " + totalSpend
    totalRemaining = Allowance - sum 
    remainingText.innerHTML = "Total Remaining: " + totalRemaining
    
}

// Delete button. Reset local storage, reset transactions object and reset html text.
deleteButton.addEventListener('dblclick',function(){
    console.log("delete clicked")
    localStorage.clear
    myTransactions = {}
    spendText.innerHTML = "Total Spent: "
    remainingText.innerHTML = "Total Remaining: "
    renderList()
    SumOfPayments()
})
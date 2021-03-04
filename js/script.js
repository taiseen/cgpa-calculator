// 02-Feb-2021 --> idea arise
// 02 to 05-March-2021 --> Finish

// all buttons...
const calculate = document.getElementById('calculate');
const addRow = document.getElementById('addRow');
const removeRow = document.getElementById('removeRow');
const reset = document.getElementById('reset');

// input field from user
const inputs = document.getElementsByTagName('input');
const inputGrades = document.getElementsByClassName('grade');
const inputCredits = document.getElementsByClassName('credit');


// output field for user
const showResult = document.getElementById('result');
const showTotalCredit = document.getElementById('totalCredit');
const showTotalGrade = document.getElementById('totalGrade');
const showCGPA = document.getElementById('cgpa');
const showGradeLatter = document.getElementById('gradeLatter');
const showWeightedGrade = document.getElementById('weightedGrade');
const showRemark = document.getElementById('remark');


// Find a <table> element with id="table":
const table = document.getElementById('table');
const newRowCreated = document.getElementById('newRowCreated');

let count = 2;

let creditArray = []
let gradeArray = []

function clearValuesFromArray() {
    creditArray = [];
    gradeArray = [];
}

// 1 =====================================================
calculate.addEventListener('click', () => {

    let totalCredit;
    let totalGrade;
    let cgpa;

    let inputTags = inputs.length

    for (let i = 0; i < inputTags; i++) {

        // checking for empty values...
        if (inputs[i].value == 0) {
            alert(`Please give corresponding values in appropriated fields...`)
            clearValuesFromArray();
            break;
        }

        let userInput = parseFloat(inputs[i].value)

        // checking for input formate...
        if (isNaN(userInput)) {
            alert(`Your input value is not number.`);
            inputs[i].value = ''
            inputs[i+1].value = ''
            break; 
        } else {

            if (i % 2 == 0) {
                creditArray.push(userInput)
            } else {
                gradeArray.push(userInput)
            }

        }

        // if (inputs[i].value != 0) {
        //     alert(`You have old values...`)
        //     break;
        // } else {

        // }

        // console.log(creditArray);
        // console.log(gradeArray);
        setValues(totalCredit, totalGrade, cgpa);
        gradingCalculation(cgpa);
    }


    


});

function setValues(totalCredit, totalGrade, cgpa) {

    totalCredit = creditArray.reduce((sum, total) => sum + total,0)
    showTotalCredit.innerText = totalCredit;

    totalGrade = gradeArray.reduce((sum, total) => sum + total,0)
    showTotalGrade.innerText = totalGrade.toFixed(2);

    //averageGrade = gradeArray.reduce((a, b) => (a + b)) / gradeArray.length;


    cgpa = cgpaCalculation() / totalCredit;

    showCGPA.innerText = cgpa.toFixed(2);
}


function cgpaCalculation() {

    let multiplicationArray = creditArray.map((multiply, idx) => multiply * gradeArray[idx])

    let weightAvgGPA = multiplicationArray.reduce((sum, total) => sum + total,0);
    showWeightedGrade.innerText = weightAvgGPA.toFixed(2);

    return weightAvgGPA;
}


function gradingCalculation(total) {

    if (4 == total) {
        showGradeLatter.innerText = 'A+';
        showRemark.innerText = 'Outstanding';
    }
    else if (4 > total && total >= 3.75) {
        showGradeLatter.innerText = 'A'
        showRemark.innerText = 'Excellent';
    }
    else if (3.75 > total && total >= 3.50) {
        showGradeLatter.innerText = 'A-'
        showRemark.innerText = 'Very Good';
    }
    else if (3.50 > total && total >= 3.25) {
        showGradeLatter.innerText = 'B+'
        showRemark.innerText = 'Good';
    }
    else if (3.25 > total && total >= 3) {
        showGradeLatter.innerText = 'B'
        showRemark.innerText = 'Satisfactory';
    }
    else if (3 > total && total >= 2.75) {
        showGradeLatter.innerText = 'B-'
        showRemark.innerText = 'Above Average';
    }
    else if (2.75 > total && total >= 2.5) {
        showGradeLatter.innerText = 'C+'
        showRemark.innerText = 'Average';
    }
    else if (2.5 > total && total >= 2.25) {
        showGradeLatter.innerText = 'C'
        showRemark.innerText = 'Below Average';
    }
    else if (2.25 > total && total >= 2) {
        showGradeLatter.innerText = 'D'
        showRemark.innerText = 'Pass';
    }
    else if (2 > total && total >= 0) {
        showGradeLatter.innerText = 'F'
        showRemark.innerText = 'Fail';
    } else {
        showGradeLatter.innerText = ".!."
        showRemark.innerText = 'out of range...';
    }
}


// 2 =====================================================
addRow.addEventListener('click', (event) => {
    addNewRow();
    clearValuesFromArray();
});


// 3 =====================================================
removeRow.addEventListener('click', () => {

    var rowCount = table.rows.length;

    // Prevent Deleting Fast 2 Rows
    if (rowCount > 2) {
        table.deleteRow(rowCount - 1);
        count--;
    } else {
        alert("You can't delete any more...")
    }

    addRow.disabled = false;
    clearValuesFromArray();
});


// 4 =====================================================
reset.addEventListener('click', () => {

    let inputTags = inputs.length
    for (let i = 0; i < inputTags; i++) {
        inputs[i].value = "";
    }

    showTotalCredit.innerText = '0'
    showTotalGrade.innerText = '0'
    showWeightedGrade.innerText = '0'
    showCGPA.innerText = '0'
    showRemark.innerText = ''
    showGradeLatter.innerText = '?'

    clearValuesFromArray();
});


// =====================================================
function addNewRow() {

    // Create an empty Row OR (<tr> element)
    var newRow = table.insertRow();


    // Insert new Cells OR (<td> elements) OR Columns
    var cell0 = newRow.insertCell();
    var cell1 = newRow.insertCell();
    var cell2 = newRow.insertCell();

    // Creat new <input> elements
    let credit = document.createElement('input');
    credit.type = "text";
    credit.className = "credit"
    // credit.onfocus = bgChange(credit);
    // credit.onBlur = bgRemove(credit);

    let grade = document.createElement('input');
    grade.type = "text";
    grade.className = "grade"
    // grade.onfocus = bgChange(grade);
    // grade.onblur = bgRemove(grade);


    // increment value display 
    if (count > 1 && count < 10) {
        cell0.innerText = '0' + count;
    } else {
        cell0.innerText = count;
    }

    if (count == 15) {
        alert(`You can't add more then ${count} rows...`)
        addRow.disabled = true;
    }
    count++;


    // Add newly created Elements into the New cells:
    cell1.appendChild(credit);
    cell2.appendChild(grade);

}


// =====================================================
newRowCreated.addEventListener('keyup', (event) => {


    //console.log(event.target.className);
    //console.log(inputGrades[1].className);

    // if (isNaN(total)) {
    //     showResult.innerText = "Your input value is not numbers.";
    // } else {
    //     showResult.innerText = total;
    // }


    // let userInput = parseFloat(event.target.value) 

    // if(inputGrades[1].className === event.target.className){
    //     gradeArray.push(userInput)
    // }else{
    //     creditArray.push(userInput)
    // }     

});


function bgChange(e) {
    //e.style.backgroundColor = "azure"
    //e.style.border  = "1px solid red"
}

function bgRemove(e) {
    //e.style.background = "white"
    //e.style.border  = "0px solid black"
}


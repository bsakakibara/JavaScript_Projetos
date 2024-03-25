// seleção de elementos
const multiplicationForm = document.querySelector("#multiplication-form")
const numberInput = document.querySelector("#number")
const multiplicationInput = document.querySelector("#multiplicator")

const multiplicationTable = document.querySelector("#multiplication-operations")

const multiplicationTitle = document.querySelector("#multiplication-title span")

// funções
const createTable = (number, multiplicatorNumber) => {
    multiplicationTable.innerHTML = ""

    for (i = 1; i <= multiplicatorNumber; i++) {
        const result = number * i

        const template = `<div class="row">
        <div class="opetation"> ${number} x ${i} = </div>
        <div class="result">${result}</div>
        </div>`

        // transferindo o código acima para html
        const parser = new DOMParser()
        // transformando o código acima para html
        const htmlTemplate = parser.parseFromString(template, "text/html")

        // selecionando o row criado no template 
        const row = htmlTemplate.querySelector(".row")

        multiplicationTable.appendChild(row)

        multiplicationTitle.innerHTML = number

    }
}


// eventos
multiplicationForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const multiplicationNumber = +numberInput.value

    const multiplicatorNumber = +multiplicationInput.value

    if (!multiplicationNumber || !multiplicatorNumber) return;



    createTable(multiplicationNumber, multiplicatorNumber)

})
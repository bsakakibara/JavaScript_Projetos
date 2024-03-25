// Seleção de elementos
const container = document.querySelector(".container")
const qrCodeBtn = document.querySelector("#qr-form button")

const qrCodeInput = document.querySelector("#qr-form input")

const qrCodeImg = document.querySelector("#qr-code img")


// Eventos

function genetareQrCode(){
const qrCodeInputValue = qrCodeInput.value

if(!qrCodeInputValue) {
    window.alert("Digite para gerar o QR Code")
}


// inserindo uma mensagem no botão para aguardar a API
qrCodeBtn.innerHTML = "Gerando Código..."

// efetivando API alterando o final com nosso input (disponibilizando a img)
qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrCodeInputValue}`

//chama a classe container e sua lista de classes (constiner.active) valída e ativa (mostra) o QR Code
// container.classList.add("active") - desta forma ele mostra o qr nativo e depois muda para o qr chamado pela API

// utilizando esta função altera a img do qrcode automáticamente, após add o evento "load"(para esperar a img carregar)
// , e após isso chamar o .container .active como acima
qrCodeImg.addEventListener("load", () => {
    container.classList.add("active")
    qrCodeBtn.innerHTML = "Código criado..."
})
}

// gerando o evento por click e enter

qrCodeBtn.addEventListener("click", () => {
    genetareQrCode()
})

qrCodeInput.addEventListener("keydown", (e) => {
    if(e.code === "Enter"){
    genetareQrCode()
}
})

// Limpar área do QR Code
qrCodeInput.addEventListener("keyup", () => {

    if(!qrCodeInput.value){
       container.classList.remove("active")
        qrCodeBtn.innerHTML = "Gerar QR Code"
    }
})
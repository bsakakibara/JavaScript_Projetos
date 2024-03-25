
const buttons = document.querySelectorAll("#image-picker li")
const image = document.querySelector("#product-image")

buttons.forEach((btn) => {
    // forEach pro looping
    btn.addEventListener("click", (e) => {
        console.log(e)
    // identificação dos botões - aqui conseguimos ver qual botão foi selecionado pela inspeção do elemento 

    buttons.forEach((btn) => {
        btn.querySelector(".color").classList.remove("selected")
        // removendo todos os botões, para poder abaixo identificar cada um deles individualmente, pois sem isso não temos como identificar cada boto clicado
    })

    const button = e.target
    // variável selecionando o valor .target, que é o elemento necessario visto na identificação dos botões
    const id = button.getAttribute("id")
    // variável, buscando o id, do button(target), informação que servirá para seguir na troca das cores
    // console.log(id) - con  esse console a cada botão que clicamos, podemos verificar seu id

    button.querySelector(".color").classList.add(".selected")
    // buscando a classe .color e adicionar a classe do selecionado (primeiro botão) (botão selected), sendo assim, todos os botões estão ativos

    image.classList.add("changing")
    // adicionando a classe changing que foi criada no css (configuração especifica de transparencia), neste momento ao clicar em cada botão, acontece a transparencia em segundos criada no css
    image.setAttribute("src", `img/iphone_${id}.jpg`)
    // aqui utilizamos o mapeamento da pasta img, no mapeamento inserimos o ${id} (API), que ao clicar em cada botão altera a cor, com transpararencia

    setTimeout(() => {
        image.classList.toggle("changing")
    },200)
    // para em 200ms remove a transferencia (da classe changing) e vai pra cor original

    })
    
})



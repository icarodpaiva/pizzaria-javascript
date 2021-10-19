// Atalhos para querySelector e querySelectorAll
const c = el => document.querySelector(el)
const cs = el => document.querySelectorAll(el)

let modalQt = 1

// Listagem das pizzas
pizzaJson.map((item, index) => {
  // Clonando o model do index.html
  let pizzaItem = c('.models .pizza-item').cloneNode(true)

  // Adicionando as informacoes referentes a cada item
  pizzaItem.setAttribute('data-key', index)
  pizzaItem.querySelector('.pizza-item--img img').src = item.img
  pizzaItem.querySelector(
    '.pizza-item--price'
  ).innerHTML = `R$ ${item.price.toFixed(2)}`
  pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description

  // Evento de clique que ativa o modal
  pizzaItem.querySelector('a').addEventListener('click', e => {
    e.preventDefault()

    // Recebendo o data-key de cada item anteriormente settado e quantidade escolhida no modal
    let key = e.target.closest('.pizza-item').getAttribute('data-key')
    modalQt = 1

    // Preenchendo as informacoes do modal
    c('.pizzaBig img').src = pizzaJson[key].img
    c('.pizzaInfo h1').innerHTML = pizzaJson[key].name
    c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
    c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(
      2
    )}`

    // Resetando o tamanho escolhido dentro do modal
    c('.pizzaInfo--size.selected').classList.remove('selected')
    cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
      if (sizeIndex == 2) {
        size.classList.add('selected')
      }
      size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
    })

    c('.pizzaInfo--qt').innerHTML = modalQt

    // Criando uma animacao de transparencia no modal
    c('.pizzaWindowArea').style.display = 'flex'
    c('.pizzaWindowArea').style.opacity = 0
    setTimeout(() => {
      c('.pizzaWindowArea').style.opacity = 1
    }, 200)
  })

  // Exibir tudo que foi anteriormente settado
  c('.pizza-area').append(pizzaItem)
})

// Eventos do modal
// Fecha o modal
cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach(item => {
  item.addEventListener('click', closeModal)
})

function closeModal() {
  c('.pizzaWindowArea').style.opacity = 0
  setTimeout(() => {
    c('.pizzaWindowArea').style.display = 'none'
  }, 500)
}

// Adiciona ou subtrai a quantidade de itens selecionados
c('.pizzaInfo--qtmenos').addEventListener('click', () => {
  if (modalQt > 1) {
    modalQt--
    c('.pizzaInfo--qt').innerHTML = modalQt
  }
})
c('.pizzaInfo--qtmais').addEventListener('click', () => {
  modalQt++
  c('.pizzaInfo--qt').innerHTML = modalQt
})

// Seleciona o tamanho
cs('.pizzaInfo--size').forEach((size, indexSize) => {
  size.addEventListener('click', e => {
    console.log('clicou')
    c('.pizzaInfo--size.selected').classList.remove('selected')
    size.classList.add('selected')
  })
})

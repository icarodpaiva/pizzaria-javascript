// Atalhos para querySelector e querySelectorAll
const c = el => document.querySelector(el)
const cs = el => document.querySelectorAll(el)

// Inicio do mapeamento de itens na tela
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

    // Recebendo o data-key de cada item anteriormente settado
    let key = e.target.closest('.pizza-item').getAttribute('data-key')

    // Preenchendo as informacoes do modal
    c('.pizzaBig img').src = pizzaJson[key].img
    c('.pizzaInfo h1').innerHTML = pizzaJson[key].name
    c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
    cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
      size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
    })
    c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(
      2
    )}`

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

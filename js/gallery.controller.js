'use strict'

renderGallery()

function renderGallery() {
    const imgs = getImgs().slice(0, 2)

    const imgsHtmls = imgs.map(img => `
        <img src="${img.url}">`)

    const elGallery = document.querySelector('.gallery')
    elGallery.innerHTML = imgsHtmls.join('')
}
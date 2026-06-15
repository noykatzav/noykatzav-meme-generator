'use strict'

renderGallery()

function renderGallery() {
    const imgs = getImgs()

    const imgsHtmls = imgs.map(img => `
        <div onclick="onImgSelect(${img.id})">
            <img src="${img.url}">
        </div>`)

    const elGallery = document.querySelector('.gallery')
    elGallery.innerHTML = imgsHtmls.join('')
}

function onImgSelect(imgId) {
    setImg(imgId)
    onToggleSections()
}
'use strict'
let gElCanvas
let gCtx 


function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    
    renderMeme()
}



function renderMeme(imgSrc='meme-imgs/meme-imgs (square)/2.jpg') {
    const elImg = new Image()
    elImg.src = imgSrc

    elImg.onload = () => {
        coverCanvasWithImg(elImg)
        drawText('Text 1', gElCanvas.width / 2, 30, 'top')
    }
}

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function drawText(text, x, y, baseline='middle') {
	gCtx.lineWidth = 2
	// gCtx.strokeStyle = 'black'

	gCtx.fillStyle = 'black'

	gCtx.font = '30px Arial'
	gCtx.textAlign = 'center'
	gCtx.textBaseline = 'middle'

	gCtx.fillText(text, x, y)
	gCtx.strokeText(text, x, y)
}
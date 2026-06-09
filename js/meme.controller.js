'use strict'
let gElCanvas
let gCtx 


function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    
    renderMeme()
}

function renderMeme(imgSrc='meme-imgs/meme-imgs (square)/2.jpg') {
    const meme = getMeme()
    if (meme) imgSrc = getImgById(meme.selectedImgId).url

    const elImg = new Image()
    elImg.src = imgSrc

    let txt = 'Text 1'
    let size, color

    if (meme.lines.length > 0) ({ txt, size, color } = meme.lines[meme.selectedLineIdx])           
    
    elImg.onload = () => {
        coverCanvasWithImg(elImg)
        drawText(txt, gElCanvas.width / 2, 10, color, size)
    }
    
    renderTxtEdit()
}

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function drawText(text, x, y, txtColor='black', txtSize=30) {
	gCtx.lineWidth = 2
	gCtx.strokeStyle = txtColor

	gCtx.fillStyle = txtColor

	gCtx.font = txtSize + 'px Arial'
	gCtx.textAlign = 'center'
	gCtx.textBaseline = 'top'

	gCtx.fillText(text, x, y)
	gCtx.strokeText(text, x, y)
}

function renderTxtEdit() {
    const meme = getMeme()
    let txt = 'Text 1'
    
    if (meme.lines.length > 0) txt = meme.lines[meme.selectedLineIdx].txt

    const elTxtEdit = document.querySelector('.txt-edit')
    if (txt) elTxtEdit.value = txt
}

function handleTxtEdit(event) {
    const txt = event.target.value
    
    setLineTxt(txt)
    renderMeme()
}

function resizeCanvas() {
	const elContainer = document.querySelector('.canvas-container')

	gElCanvas.width = elContainer.offsetWidth
	gElCanvas.height = elContainer.offsetHeight
}
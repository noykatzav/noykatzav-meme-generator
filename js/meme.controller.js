'use strict'
let gElCanvas
let gCtx 


function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    
    renderMeme()
    renderEdit()
}

function renderMeme() {
    const meme = getMeme()
    if (!meme) return
        
    //get image
    const imgSrc = getImgById(meme.selectedImgId).url

    const elImg = new Image()
    elImg.src = imgSrc

        
    elImg.onload = () => {
        //render image
        coverCanvasWithImg(elImg)

        //render text
        meme.lines.reduce((acc, line, idx)=> { 
            let { txt, size, color } = line

            var isSelected = meme.selectedLineIdx===idx

            drawTextLine(txt, gElCanvas.width / 2, acc, color, isSelected, size)

            acc += size + 20
            return acc
            
        }, 10)
    }
}

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function drawTextLine(text, x, y, txtColor='black', isSelected=false, txtSize=30) {
	gCtx.lineWidth = 1
    
	gCtx.fillStyle = txtColor
    
	gCtx.font = `bold ${txtSize}px Arial`
	gCtx.textAlign = 'center'
	gCtx.textBaseline = 'top'
    
	gCtx.fillText(text, x, y)
    
    if (isSelected) {
        gCtx.strokeStyle = 'yellow'
        gCtx.strokeText(text, x, y)
    }
}

function renderEdit() {
    const meme = getMeme()
    
    const {txt, color} = meme.lines[meme.selectedLineIdx]

    const elTxtInput = document.querySelector('.txt-edit')
    const elTxtColor = document.querySelector('[name="txt-color"]')
    
    elTxtInput.value = txt
    elTxtColor.value = color
}

function handleTxtEdit(event) {
    const txt = event.target.value
    
    setLineTxt(txt)
    renderMeme()
}

function onTxtColorChange(color) {
    setLineColor(color)
    renderMeme()
}

function onIncreaseTxt() {
    setLineSize(+2)
    renderMeme()
}

function onDecreaseTxt() {
    setLineSize(-2)
    renderMeme()
}

function onAddLine() {
    addLine()
    
    setSelectedLineIdx(getMeme().lines.length - 1)
    renderMeme()
    renderEdit()
}

function onNextLine() {  
    const meme =  getMeme() 
    const linesLen =  meme.lines.length
    var nextLineIdx = meme.selectedLineIdx + 1

    if (nextLineIdx === linesLen) nextLineIdx = 0

    setSelectedLineIdx(nextLineIdx)

    renderMeme()
    renderEdit()
}

function onDownloadMeme(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function resizeCanvas() {
	const elContainer = document.querySelector('.canvas-container')

	gElCanvas.width = elContainer.offsetWidth
	gElCanvas.height = elContainer.offsetHeight
}
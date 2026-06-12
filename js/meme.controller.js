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
            // let x, y
            let { txt, size, color, x, y, width, height} = line
            var isSelected = meme.selectedLineIdx===idx
            
            if (!y) {
                y = acc
                setLineCords(idx, x, y)
            }
            
            let { textWidth, textHeight} = drawTextLine(txt, x, y, color, isSelected, size)
            
            if (!width || !height) {
                width = textWidth
                height = textHeight
                setLineBounds(idx, width, height)
            }
            
            acc = y + height + 10
            if (acc >= gElCanvas.width) acc = 10

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
	gCtx.strokeStyle = '#ffffffff'
    
	gCtx.font = `bold ${txtSize}px Arial`
	gCtx.textBaseline = 'top'
    
	gCtx.fillText(text, x, y)
	gCtx.strokeText(text, x, y)

    const metrics = gCtx.measureText(text)

    const textWidth = metrics.width
    const textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
    const ascent = metrics.actualBoundingBoxAscent
    
    if (isSelected) {
        var padding = 5
        
        gCtx.lineWidth = 1
        gCtx.strokeStyle = '#ffb9f6ff'
        gCtx.strokeRect(x - padding, y - ascent - padding, textWidth + padding * 2, textHeight + padding * 2)
    }

    return { textWidth , textHeight }
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
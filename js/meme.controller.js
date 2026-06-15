'use strict'
let gElCanvas
let gCtx

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    addListeners()

    renderMeme()
    renderEdit()

    resizeCanvas()
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
        meme.lines.reduce((acc, line, idx) => {
            let { txt, size, color, x, y } = line
            var isSelected = meme.selectedLineIdx === idx

            if (!y) {
                y = acc
                setLineCords(idx, x, y)
            }

            let { textWidth, textHeight } = drawTextLine(txt, x, y, color, isSelected, size)
            setLineBounds(idx, textWidth, textHeight)

            acc = y + textHeight + 10
            if (acc >= gElCanvas.width) acc = 10

            return acc

        }, 10)

        saveMeme()
    }

}

function renderEdit() {
    const meme = getMeme()
    const selectedLineIdx = meme.selectedLineIdx

    if (selectedLineIdx < 0) {
        clearEdit()
        return
    }

    const { txt, color } = meme.lines[selectedLineIdx]

    const elTxtInput = document.querySelector('.txt-edit')
    const elTxtColor = document.querySelector('[name="txt-color"]')

    elTxtInput.value = txt
    elTxtColor.value = color
}

function clearEdit() {
    const elTxtInput = document.querySelector('.txt-edit')
    const elTxtColor = document.querySelector('[name="txt-color"]')

    elTxtInput.value = ''
    elTxtColor.value = ''
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()

    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })

}

function addMouseListeners() {
    gElCanvas.addEventListener('click', onTextClick)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onTextClick)
}

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function drawTextLine(text, x, y, txtColor = '#000000', isSelected = false, txtSize = 30) {
    gCtx.lineWidth = 1

    gCtx.fillStyle = txtColor

    gCtx.font = `bold ${txtSize}px poppins-extrabold`
    gCtx.textBaseline = 'top'

    gCtx.fillText(text, x, y)

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

    return { textWidth, textHeight }
}

function onTextClick(ev) {
    let selectedLineIdx = -1

    const pos = getEvPos(ev)
    let clickedLinePos = getClickedLine(pos)


    if (clickedLinePos !== undefined) selectedLineIdx = clickedLinePos

    setSelectedLineIdx(selectedLineIdx)

    renderMeme()
    renderEdit()
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
    const meme = getMeme()
    const linesLen = meme.lines.length
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

function getEvPos(ev) {
    // Check if it is a touch event
    if (TOUCH_EVENTS.includes(ev.type)) {
        ev.preventDefault() // Stop double-firing mouse fallback events

        const touch = ev.targetTouches[0]

        // Get the absolute position of the canvas on the screen
        const rect = gElCanvas.getBoundingClientRect()

        // Subtract canvas screen coordinates from touch screen coordinates
        return {
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top,
        }
    } else {
        // Desktop mouse tracking stays lightweight
        return {
            x: ev.offsetX,
            y: ev.offsetY,
        }
    }
}
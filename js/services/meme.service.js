'use strict'

var gMeme = {
    selectedImgId: 3,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 45,
            color: 'pink',
            x: 10,
            y: 0
        },
        {
            txt: 'Thats funny',
            size: 30,
            color: 'black', 
            x: 10,
            y: 0
        }
    ]
}
var gKeywordSearchCountMap = {'funny': 0,'cat': 0, 'baby': 0}


function getMeme() {
    return gMeme
}

function addLine(txt, color = 'black', size = 30, x = 10, y = 0) {
    if (!txt) txt = `Text ${gMeme.lines.length + 1}`

    gMeme.lines.push({txt, size, color, x, y})
}

function setSelectedLineIdx(lineIdx) {
    gMeme.selectedLineIdx = lineIdx
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setLineSize(sizeInc) {
    gMeme.lines[gMeme.selectedLineIdx].size += sizeInc
}

function setLineColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setLineCords(lineIdx=gMeme.selectedLineIdx, x, y) {
    gMeme.lines[lineIdx].x = x
    gMeme.lines[lineIdx].y = y
}

function setLineBounds(lineIdx=gMeme.selectedLineIdx, width, height) {
    gMeme.lines[lineIdx].width = width
    gMeme.lines[lineIdx].height = height
}

function setImg(imgId=1) {
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'Text 1',
                size: 45,
                color: 'blue',
                x: 10,
                y: 0
            }   
        ]
    }    
}


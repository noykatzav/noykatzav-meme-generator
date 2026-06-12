'use strict'

var gMeme = {
    selectedImgId: 3,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 45,
            color: '#ffc0cb',
            x: 10,
            y: 0
        },
        {
            txt: 'Thats funny',
            size: 30,
            color: '#000000', 
            x: 10,
            y: 0
        }
    ]
}
var gKeywordSearchCountMap = {'funny': 0,'cat': 0, 'baby': 0}


function getMeme() {
    return gMeme
}

//Check if the click is on any line

function getClickedLine(clickedPos) {
	const lines = gMeme.lines    
    const clickedLines = lines.filter(line => clickedPos.x >= line.x && clickedPos.x <= line.x + line.width && clickedPos.y >= line.y && clickedPos.y <= line.y + line.height)
    
    if (clickedLines && clickedLines.length > 0) return lines.findIndex(line => line.txt === clickedLines[0].txt)
}

function addLine(txt, color = '#000000', size = 30, x = 10, y = 0) {
    if (!txt) txt = `Text ${gMeme.lines.length + 1}`

    gMeme.lines.push({txt, size, color, x, y})
}

function setSelectedLineIdx(lineIdx) {
    gMeme.selectedLineIdx = lineIdx
}

function setLineTxt(txt) {
    if (gMeme.selectedLineIdx < 0) return 

    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setLineSize(sizeInc) {
    if (gMeme.selectedLineIdx < 0) return 

    gMeme.lines[gMeme.selectedLineIdx].size += sizeInc
}

function setLineColor(color) {
    if (gMeme.selectedLineIdx < 0) return 

    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setLineCords(lineIdx=gMeme.selectedLineIdx, x, y) {
    if (lineIdx === undefined || lineIdx < 0) return 

    gMeme.lines[lineIdx].x = x
    gMeme.lines[lineIdx].y = y
}

function setLineBounds(lineIdx=gMeme.selectedLineIdx, width, height) {
    if (lineIdx === undefined || lineIdx < 0) return 

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
                color: '#0000ff',
                x: 10,
                y: 0
            }   
        ]
    }    
}


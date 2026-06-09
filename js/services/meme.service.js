'use strict'

var gMeme = {
    selectedImgId: 3,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 30,
            color: 'pink'
        },
        {
            txt: 'Thats funny',
            size: 20,
            color: 'black'
        }
    ]
}
var gKeywordSearchCountMap = {'funny': 0,'cat': 0, 'baby': 0}


function getMeme() {
    return gMeme
}

function addLine(txt, color='black', size=30) {
    if (!txt) txt = `Text ${gMeme.lines.length + 1}`

    gMeme.lines.push({txt, size, color})
    console.log(gMeme.lines)
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

function setImg(imgId=1) {
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'Text 1',
                size: 20,
                color: 'blue'
            }   
        ]
    }    
}


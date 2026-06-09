'use strict'

var gMeme = {
    selectedImgId: 3,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'black'
        }
    ]
}
var gKeywordSearchCountMap = {'funny': 0,'cat': 0, 'baby': 0}


function getMeme() {
    return gMeme
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setLineTxtSize(sizeInc) {
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
                color: 'black'
            }   
        ]
    }    
}


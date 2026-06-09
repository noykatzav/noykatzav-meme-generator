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

function setImg(imgId) {
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: []
    }
    
    // place holder - after working on layout should be removed
    renderMeme()
}

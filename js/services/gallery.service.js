'use strict'

const gImgs = [
    { id: 1, url: 'meme-imgs/meme-imgs (square)/1.jpg', keywords: [] },
    { id: 2, url: 'meme-imgs/meme-imgs (square)/2.jpg', keywords: [] },
    { id: 3, url: 'meme-imgs/meme-imgs (square)/3.jpg', keywords: [] },
    { id: 4, url: 'meme-imgs/meme-imgs (square)/4.jpg', keywords: [] },
    { id: 5, url: 'meme-imgs/meme-imgs (square)/5.jpg', keywords: [] },
    { id: 6, url: 'meme-imgs/meme-imgs (square)/6.jpg', keywords: [] },
    { id: 7, url: 'meme-imgs/meme-imgs (square)/7.jpg', keywords: [] },
    { id: 8, url: 'meme-imgs/meme-imgs (square)/8.jpg', keywords: [] },
    { id: 9, url: 'meme-imgs/meme-imgs (square)/9.jpg', keywords: [] },
    { id: 10, url: 'meme-imgs/meme-imgs (square)/10.jpg', keywords: [] },
    { id: 11, url: 'meme-imgs/meme-imgs (square)/11.jpg', keywords: [] },
    { id: 12, url: 'meme-imgs/meme-imgs (square)/12.jpg', keywords: [] },
    { id: 13, url: 'meme-imgs/meme-imgs (square)/13.jpg', keywords: [] },
    { id: 14, url: 'meme-imgs/meme-imgs (square)/14.jpg', keywords: [] },
    { id: 15, url: 'meme-imgs/meme-imgs (square)/15.jpg', keywords: [] },
    { id: 16, url: 'meme-imgs/meme-imgs (square)/16.jpg', keywords: [] },
    { id: 17, url: 'meme-imgs/meme-imgs (square)/17.jpg', keywords: [] },
    { id: 18, url: 'meme-imgs/meme-imgs (square)/18.jpg', keywords: [] }
]


function getImgs() {
    return gImgs
}

function getImgById(imgId) {
    return gImgs.find(img => img.id === imgId)
}
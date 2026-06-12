'use strict'
const MEME_STORAGE_KEY = 'meme'

function fetchMeme() {
    const memeLoc = localStorage.getItem(MEME_STORAGE_KEY)

    if (memeLoc && memeLoc.length > 1) gMeme = JSON.parse(memeLoc)
}

function saveMeme() {
    const meme = getMeme()

    localStorage.setItem(MEME_STORAGE_KEY, JSON.stringify(meme))
}
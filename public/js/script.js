//import {findAll} from "./dom-loader" 

// function to add or remove classes invisible and visible. It has been used to show or hide an element
function hide_show(elementClicked) {
    if (elementClicked.hasClass("invisible")) {
        elementClicked.removeClass("invisible")
        elementClicked.addClass("visible")
    } else {
        elementClicked.removeClass("visible")
        elementClicked.addClass("invisible")
    }
}

// to get the element which contains an specific class passed by parameter
function getClickedElementPage(elementSelectedPage, nameFunction) {
    window.onclick = e => {
        textElementClicked = e.target.innerText
        if ($(e.target).hasClass(elementSelectedPage) == true) {
            console.log(textElementClicked)
            nameFunction(textElementClicked)
            return textElementClicked
        } else {
            console.log("doesn't have the class/element ", elementSelectedPage)
        }
    }
}


// find the element clicked inside the db
function findListClickedOnDB(textElementClicked){
    console.log("findListClickedOnDB ",textElementClicked)
}
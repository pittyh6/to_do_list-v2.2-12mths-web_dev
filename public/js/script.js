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
function getClickedElementPage(elementSelectedPage) {
    window.onclick = e => {
        textElementClicked = e.target.innerText
        if ($(e.target).hasClass(elementSelectedPage) == true) {
            console.log(textElementClicked)
            window.location.href="http://localhost:3000/"+textElementClicked
            return textElementClicked
        } else {
            console.log("doesn't have the class/element ", elementSelectedPage)
        }
    }
}

function deleteButtonPage(){
    window.onclick = e => {
        let deleteButtonClicked = e.target.innerText
        console.log('which delete button: ', deleteButtonClicked)
        
    }
}


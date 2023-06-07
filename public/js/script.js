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


function getClickedElementPage(findAll) {
    window.onclick = e => {
        textElementClicked = e.target.innerText
        if ($(e.target).hasClass('nav-list-title') == true) {
            console.log(textElementClicked)
            return textElementClicked
        } else {
            console.log("doesn't have the class .nav-list-title")
        }

    }
}
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

function getClickedElementPage() {
    window.onclick = e => {
        console.log(e.target.innerText)
    }
}



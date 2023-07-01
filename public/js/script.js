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
            window.location.href="http://localhost:3000/"+textElementClicked
            return textElementClicked
        } else {
            //console.log("doesn't have the class/element ", elementSelectedPage)
            // This block is empty, so it does nothing
        }
    }
}
function getWriteDownElement(fieldInputText){
    window.location.href="http://localhost:3000/"+fieldInputText
    return fieldInputText
}

window.onclick = event => {
    const target = event.target;
    if (target.classList.contains("item-list") && target.classList.contains("undone-task")) {
        target.classList.remove("undone-task");
        target.classList.add("done-task");
    } else if (target.classList.contains("item-list") && target.classList.contains("done-task")) {
        target.classList.remove("done-task");
        target.classList.add("undone-task");
    } else {
        console.log("It is not an item:", target);
    }
}

function downloadList(list, items){
    console.log("the list name: ", list)
    console.log("the array: ", items)
}
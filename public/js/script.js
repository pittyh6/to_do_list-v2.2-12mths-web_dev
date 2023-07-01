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
            window.location.href = "http://localhost:3000/" + textElementClicked
            return textElementClicked
        } else {
            //console.log("doesn't have the class/element ", elementSelectedPage)
            // This block is empty, so it does nothing
        }
    }
}
function getWriteDownElement(fieldInputText) {
    window.location.href = "http://localhost:3000/" + fieldInputText
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

/*
//download list using html content
function downloadList(list, items){
    const file = new File(items, list+ '.text', {
        type: 'text/plain',
    })
    
    const link = document.createElement('a')
    const url = URL.createObjectURL(file)

    link.href = url
    link.download = file.name
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
}

async function downloadList(list) {
    if (list) {
        console.log("Downloading list name::: ", list)
        const textListName = list
        const res = await fetch('/downloadList', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ list: list })
        })
        .then(list => {
            console.log("Download list response:", textListName);
            return textListName
            // Handle the response as needed
        }).then(data => {
            console.log("Download data: ", data)
            return data
        })
            .catch(error => {
                console.log("Error on download list:", error);
                // Handle the error
            });
    } else {
        console.log("Error on download list.....");
    }
}

async function downloadList(list){
    if(list){
        console.log("Downloading list name: ", list)
        try{
            const response = await fetch('/downloadList', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({list: list})
            })
            if(response.ok){
                const data = await list
                //const data = await response.json()
                console.log("data: ", data)
                //console.log("Download data: ", data.list)
                return data
                //return data.list
            }else{
                console.log("Error on download list: ", response.status)
            }
        }catch(error){
            console.log("Error ibn download list created: ", error)
        }
    }else{
        console.log("Error on download list: List name is empty.");
    }
}
*/
function downloadList(list) {
    console.log("Download list name: ", list)
    const data = {list}
    console.log("data object: ", data)

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    }
    fetch('/downloadList', options)
}
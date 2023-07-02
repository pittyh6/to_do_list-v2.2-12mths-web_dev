
// buttons
let nav_lists = $(".nav-lists")
let btn_delete = document.querySelectorAll('.btn-delete')
let btn_add = $(".btn-add")
let btn_create_new_list = $(".btn-create-new-list")
let btn_download_list = $(".btn-download-list")
let btn_create = $(".btn-create")
let input_create_new_list = document.querySelector('.input-new-list')
let input_add_item_to_list = document.querySelector('.input-item-to-list')
let page_header_list_name = document.querySelector('.page-header-list-name')
let item_list = document.querySelectorAll('.item-list')


//hide elements
let nav_list_group = $(".nav-list-group")
let field_create_list = $(".field-create-list")

//hide and show nav_list on the navbar and the create new list field
nav_lists[0].addEventListener("click",function(){
    hide_show(nav_list_group)
})
btn_create_new_list[0].addEventListener('click', function(){
    hide_show(field_create_list)
})

//selected nav-bar list name
nav_lists[0].addEventListener("click",function(){
    const navListTitleClass = "nav-list-title"
    getClickedElementPage(navListTitleClass)
})

//select the Create List button 
btn_create[0].addEventListener('click', function(){
    console.log("create new list button clicked")
    getWriteDownElement(input_create_new_list.value)
})

/*
//Download list using html data
btn_download_list[0].addEventListener("click", function(){
    const itemsArray = []
    let listName = document.querySelector(".page-header-list-name").textContent
    for(let i = 0; i <= item_list.length-1 ; i++){
        //itemsArray.push(item_list[i].textContent)
        itemsArray.push(item_list[i].textContent + '\n')
    }
    downloadList(listName, itemsArray)
})
*/

//Download list using mongoose
btn_download_list[0].addEventListener("click", function(){
    let listName = document.querySelector(".page-header-list-name").textContent
    downloadList(listName)
})
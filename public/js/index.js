
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
//select the Add item to the list button
btn_add[0].addEventListener('click', function(){
    //input text
    const input_add_item_text = input_add_item_to_list.value
    console.log(" item text: ", input_add_item_text)
    //list name
    const list_name = page_header_list_name
    console.log("page header list name: ",list_name.textContent )
})





//select the delete button
btn_delete.forEach(btnDelete => {
    btnDelete.addEventListener('click', event => {
        console.log('btn_deleted event: ', event)
        const elementSelectedList = event.target.previousElementSibling
        console.log('elementSelectedList: ', elementSelectedList)
        const textElementSelectedList = elementSelectedList.textContent
        console.log('textElementSelectedList: ', textElementSelectedList)
        const getNameList = page_header_list_name.textContent
        console.log('TextListName: ',getNameList)
    })
})

//select the Download List button
btn_download_list[0].addEventListener('click', function(){
    console.log('btn_download_list clicked')
})
*/
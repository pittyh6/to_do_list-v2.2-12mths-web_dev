// buttons
let nav_lists = $(".nav-lists")
let btn_delete = $(".btn-delete")
let btn_add = $(".btn-add")
let btn_create_new_list = $(".btn-create-new-list")
let btn_download_list = $(".btn-download-list")
let btn_create = $(".btn-create")

//hide elements
let nav_list_group = $(".nav-list-group")
let field_create_list = $(".field-create-list")


function hide_show(elementClicked){
    if(elementClicked.hasClass("invisible")){
        elementClicked.removeClass("invisible")
        elementClicked.addClass("visible")
    }else{
        elementClicked.removeClass("visible")
        elementClicked.addClass("invisible")
    }
}


nav_lists[0].addEventListener("click",function(){
    hide_show(nav_list_group)
})
btn_create_new_list[0].addEventListener('click', function(){
    hide_show(field_create_list)
})
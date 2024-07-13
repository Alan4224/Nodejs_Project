// Change status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]")
if(buttonChangeStatus.length > 0){
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");
    buttonChangeStatus.forEach(button=>{
        button.addEventListener("click",()=>{
            const statusCurrent = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");
            let statusChange = statusCurrent =="active" ? "inactive" : "active";
            const action = path +`/${statusChange}/${id}?_method=PATCH`;
            formChangeStatus.action = action;
            formChangeStatus.submit();
        })
    })
}
//end change status
//button delete
const buttonDeletes = document.querySelectorAll("[button-delete]");
if(buttonDeletes.length > 0){
    const formDelete = document.querySelector("#form-button-delete");
    const path = formDelete.getAttribute("data-path");
    buttonDeletes.forEach(button=>{
        button.addEventListener("click",()=>{
            const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này ?");
            if(isConfirm){
            const id = button.getAttribute("data-id");
            const action = `${path}/${id}?_method=DELETE`;
            formDelete.action = action;
            formDelete.submit();
            }
        })
    })
}
//end button delete
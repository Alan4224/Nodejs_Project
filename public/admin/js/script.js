const buttonsStatus = document.querySelectorAll("[button-status]");
if (buttonsStatus.length > 0) {
  let url = new URL(window.location.href);

  buttonsStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");

      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href;
    });
  });
}
// End Button status
// Form Search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(window.location.href);

  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = e.target.elements.keyword.value;

    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }

    window.location.href = url.href;
  });
}
//end search
//pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]");
if (buttonsPagination) {
  let url = new URL(window.location.href);

  buttonsPagination.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");

      url.searchParams.set("page", page);

      window.location.href = url.href;
    });
  });
}
//end pagination
//checkboxMulti
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const inputsId = checkboxMulti.querySelectorAll("input[name='id']");
  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      inputsId.forEach((input) => {
        input.checked = true;
      });
    } else {
      inputsId.forEach((input) => {
        input.checked = false;
      });
    }
  });

  inputsId.forEach((input) => {
    input.addEventListener("click", () => {
      const countChecked = checkboxMulti.querySelectorAll(
        "input[name='id']:checked"
      ).length;
      if (countChecked == inputsId.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}
//end checkboxMulti
//formChangeMulti
const formChangeMulti = document.querySelector("[ form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const inputChecked = checkboxMulti.querySelectorAll(
      "input[name='id']:checked"
    );
    const typeChange = e.target.elements.type.value;
    if (typeChange == "delete") {
      const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này ?");
      if (!isConfirm) {
        return;
      }
    }
    if (inputChecked.length > 0) {
      let ids = [];
      const inputIds = formChangeMulti.querySelector("input[name='ids']");
      inputChecked.forEach((input) => {
        const id = input.value;
        if (typeChange == "change-position") {
          const position = input
            .closest("tr")
            .querySelector("input[name='position']").value;
          console.log(position);
          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);
        }
      });
      inputIds.value = ids.join(", ");
      formChangeMulti.submit();
    } else {
      alert("Vui lòng chọn 1 bản ghi!");
    }
  });
}
//end formChangeMulti
//show alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert){
  const closeAlert = document.querySelector("[close-alert]");
  let dataTime = showAlert.getAttribute("data-time");
  dataTime = parseInt(dataTime);
  setTimeout(()=>{
    showAlert.classList.add("alert-hidden");
  }, dataTime);
  closeAlert.addEventListener("click",()=>{
    showAlert.classList.add("alert-hidden");
  });
}
//end show alert
//up load image
const uploadImage = document.querySelector("[ upload-image]");
if(uploadImage){
  const uploadImageInput = uploadImage.querySelector("[ upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector("[ upload-image-preview]");
  uploadImageInput.addEventListener("change",(e)=>{
    console.log(e);
    const file = e.target.files[0];
    if(file){
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  })
}
//end up load image
//Sort
const sort = document.querySelector("[sort]");
if(sort){
  let url = new URL(window.location.href);
  const sortSelect = sort.querySelector("[sort-select]");
  const sortClear = sort.querySelector("[sort-clear]");
  //Sắp xếp
  sortSelect.addEventListener("change",(e)=>{
    const value = e.target.value;
    const [sortKey, sortValue]= value.split("-");
    url.searchParams.set("sortKey", sortKey);
    url.searchParams.set("sortValue", sortValue);
    window.location.href = url.href;
  })
  //Xóa sắp xếp
  sortClear.addEventListener("click",(e)=>{
    url.searchParams.delete("sortKey");
    url.searchParams.delete("sortValue");
    window.location.href = url.href;
  })
  //Thêm selected cho option
  const sortKey = url.searchParams.get("sortKey");
  const sortValue = url.searchParams.get("sortValue");
  if(sortKey && sortValue){
    const value =`${sortKey}-${sortValue}`;
    const optionSelected = sortSelect.querySelector(`option[value='${value}']`);
    console.log(optionSelected);
    optionSelected.selected = true;
  }
}
//End Sort
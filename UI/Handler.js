let allButtons = document.getElementsByClassName("button");

let exitButton = allButtons[0];
exitButton.addEventListener("click", exit);
let formLogin = document.getElementsByClassName("toLog")[0];

function exit() {
  if (main.getUserName() === "") {
    let form = formLogin.querySelector(".login");
    // formLogin.style.display = "block";
    form.style.display = "block";
    exitButton.removeEventListener("click", exit);
    exitButton.addEventListener("click", logining);
  } else {
    main.logOut();
    View.showUserInfo("images/unknown.png", main.getUserName());
  }
}

function logining(event) {
  let form = formLogin.querySelector(".login");
  let login = form.querySelectorAll("input")[0];
  let password = form.querySelectorAll("input")[1];
  if (login.value !== "" && password.value !== "") {
    main.logIn(login.value);
    exitButton.removeEventListener("click", logining);
    exitButton.addEventListener("click", exit);
    form.style.display = "none";
    // formLogin.style.display = "inline-block";
  }
}

let addButton1 = allButtons[1];
addButton1.addEventListener("click", adding);
let addPopUp = document.querySelector(".add-post");
let addButton = addPopUp.querySelector(".confirm-add");
let addDescr = addPopUp.querySelector(".about-photo-all textarea");
let addHashtags = addPopUp.querySelector(".about-photo-all input");
let photo1 = addPopUp.querySelector("img");

function adding(event) {
  event.preventDefault();
  addPopUp.style.display = "grid";

  document.addEventListener('mousedown', closeaddPopUp);

  addButton.addEventListener("click", add1 = function(event) {
    event.preventDefault();
    event.stopPropagation();
    let newPost = {};
    newPost.id = (new Date() / 1000).toString();
    newPost.description = addDescr.value;
    newPost.createdAt = new Date();
    newPost.author = main.getUserName();
    if (photo1.src.indexOf("/toDownload.png") === -1)
      newPost.photoLink = photo1.src;
    else {
      alert("Загрузите фото");
      return;
    }
    newPost.likes = [];
    if (addHashtags.value !== "")
      newPost.hashtags = addHashtags.value.split(" ");
    else
      newPost.hashtags = [];

    if (PostCollection.validate(newPost)) {
      if (confirm("Вы действительно хотите добавить пост?")) {
        main.addPhotoPost(newPost);
        addPopUp.style.display = "none";
      }
    }
    addButton.removeEventListener("click", add1);
  });
}

function closeaddPopUp(event) {
  if (event.target.closest('.add-post') === null) {
    addPopUp.style.display = 'none';
    document.removeEventListener('mousedown', closeaddPopUp);
    addButton.removeEventListener("click", add1);
    photo1.src = "images/toDownload.png";
    addDescr.value = "";
    addHashtags.value = "";
  }
}

let uploadPhoto = document.getElementById("file-input");
uploadPhoto.addEventListener('change', function(e) {
  let reader = new FileReader();
  let files = e.target.files;
  reader.onloadend = function() {
    let img = document.querySelector(".add-photo img");
    img.src = reader.result;
  };
  let link = reader.readAsDataURL(files[0]);
});

let filterButton = allButtons[2];
filterButton.addEventListener("click", filtering);

function filtering() {
  let fields = document.querySelectorAll(".Filter p");
  let findName = fields[1].querySelector("input");
  let findDate = fields[2].querySelector("input");
  let findHashtags = fields[3].querySelector("input");

  let filter = {};
  if (findName.value !== "")
    filter.author = findName.value;
  if (findDate.value !== "") {
    let c = Date.parse(findDate.value);
    filter.createdAt = new Date(c);
  }
  if (findHashtags.value !== "")
    filter.hashtags = findHashtags.value.split(" ");
  main.getPhotos(filter);
}

let menu = document.getElementsByClassName("hidden-right")[0];
menu.addEventListener("click", showMenu);

function showMenu() {
  let rightPanel = document.getElementsByClassName("right_panel")[0];
  rightPanel.style.display = "block";
  rightPanel.style.visibility = "visible";
  rightPanel.style.width = "35%";
  menu.removeEventListener("click", showMenu);
  menu.addEventListener("click", hideMenu);
}

function hideMenu() {
  let rightPanel = document.getElementsByClassName("right_panel")[0];
  rightPanel.style.display = "none";
  menu.removeEventListener("click", hideMenu);
  menu.addEventListener("click", showMenu);
}

let editPopUp = document.querySelector(".edit-post");
let settingsButtons = document.querySelectorAll(".menu-settings ul li");
let editSetting = settingsButtons[0];
let deleteSetting = settingsButtons[1];
let editDescr = editPopUp.querySelector("textarea");
let editHashtags = editPopUp.querySelector("input");
let photo = editPopUp.querySelector("img");
let editButton = editPopUp.querySelector(".confirm-edit");
editButton.addEventListener("click", editing);

function editing(event) {
  event.preventDefault();
  event.stopPropagation();
  post = main.getPost(editPopUp.id);
  editPopUp.id = undefined;
  let newPost = post;
  newPost.description = editDescr.value;
  if(editHashtags.value !== "")
  newPost.hashtags = editHashtags.value.split(" ");
  else newPost.hashtags = [];
  if (PostCollection.validate(newPost)) {
    if (confirm("Вы действительно хотите редактировать пост?")) {
      main.editPhotoPost(post.id, newPost);
      editPopUp.style.display = "none";
      // editButton.removeEventListener("click", editing);
    }
  }
}

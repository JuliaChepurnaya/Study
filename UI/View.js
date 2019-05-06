class View {

  static _createPost(post) {
    let template = document.querySelector("#photo-template");
    let temp = template.content.cloneNode(true);
    let userName = main.getUserName();
    let name = temp.querySelectorAll("a")[0];
    name.innerHTML = post.author;

    let time = temp.querySelectorAll(".time")[0];
    time.innerHTML = View._createdAtToString(post.createdAt);

    let photo = temp.querySelectorAll(".photo")[0];
    photo.src = post.photoLink;

    let description = temp.querySelectorAll(".about-photo b i")[0];
    description.innerHTML = post.description;

    let str;
    let likes = temp.querySelectorAll(".like span")[0];
    if (post.likes[0] !== undefined) {
      str = post.likes[0].toString() + " и еще " + (post.likes.length - 1).toString() + " нравится";
      likes.innerHTML = str;
    } else
      likes.innerHTML = "0";

    let linkLike = temp.querySelector(".like img");
    if (!post.likes.includes(userName))
      linkLike.src = "images/like2.png";
    else linkLike.src = "images/like.png";

    let tags = temp.querySelectorAll(".hashtags p")[0];
    str = "";
    for (let i = 0; i < post.hashtags.length; i++) {
      str += post.hashtags[i] + " ";
    }
    tags.innerHTML = str;

    let addID = temp.querySelector(".post");
    addID.setAttribute("id", post.id);

    let settings = temp.querySelector(".if-user");
//    let click1;
//    let close1;
    let editPopUp = document.querySelector(".edit-post");
    let editButton = editPopUp.querySelector(".confirm-edit");
    if (userName === post.author) {
      settings.style.display = "block";
      let settingsButtons = temp.querySelectorAll(".menu-settings ul li");
      let editSetting = settingsButtons[0];
      let deleteSetting = settingsButtons[1];
      let editDescr = editPopUp.querySelector("textarea");
      let editHashtags = editPopUp.querySelector("input");
      let photo = editPopUp.querySelector("img");

      editSetting.addEventListener("click", function(event) {
        event.preventDefault();
        editPopUp.id = post.id;
        editPopUp.style.display = "grid";
        editDescr.value = post.description;
        editHashtags.value = post.hashtags.join(" ");
        photo.src = post.photoLink;
});
      let closePopUp = document.getElementsByClassName("exit-edit")[0];
      closePopUp.addEventListener("click",function () {
        event.preventDefault();
        editPopUp.style.display = "none";
      });

      deleteSetting.addEventListener("click", function(e) {
        e.preventDefault();
        if (confirm("Вы действительно хотите удалить этот пост?"))
          main.deletePhotoPost(post.id);
      });

      // document.addEventListener('mousedown', close1 = function(e) {
      //   if (event.target.closest('.edit-post') === null) {
      //     editPopUp.style.display = 'none';
      //     document.removeEventListener('mousedown', close1);
      //     editButton.removeEventListener("click", click1);
      //   }
      // });
    }

    let buttonLike = temp.querySelector(".like-button");
    buttonLike.id = post.id;
    buttonLike.addEventListener("click", liking);

    function liking() {
      if (main.getUserName() !== "") {
        let foundPost = main.getPost(this.id);
        let oldPost = foundPost;
        if (!foundPost.likes.includes(main.getUserName())) {
          foundPost.likes.push(main.getUserName());
          main.replacePost(oldPost, foundPost);
          let toUpdate = document.getElementById(foundPost.id);
          View.updateLikes(foundPost, toUpdate);
          let linkLike = toUpdate.querySelector(".like img");
          linkLike.src = "images/like.png";
        } else {
          foundPost.likes.splice(foundPost.likes.indexOf(main.getUserName()), 1);
          main.replacePost(oldPost, foundPost);
          let toUpdate = document.getElementById(foundPost.id);
          View.updateLikes(foundPost, toUpdate);
          let linkLike = toUpdate.querySelector(".like img");
          linkLike.src = "images/like2.png";
        }
        let indexStartPost = main.getPhotoposts().indexOf(foundPost);
        main.replaceSomePhotoPosts(indexStartPost, foundPost);
      }
    }

    return temp;
  }

  static updateLikes(post, toUpdate) {
    let likes = toUpdate.querySelectorAll(".like span")[0];
    if (post.likes[0] !== undefined) {
      let str = post.likes[0].toString() + " и еще " + (post.likes.length - 1).toString() + " нравится";
      likes.innerHTML = str;
    } else likes.innerHTML = "0";
  }

  static _createdAtToString(createdAt) {
    let result = '';
    if (createdAt.getHours() < 10) {
      result += '0'
    }
    result += createdAt.getHours() + ':';
    if (createdAt.getMinutes() < 10) {
      result += '0';
    }
    result += createdAt.getMinutes() + '<br>';
    if (createdAt.getDate() < 10) {
      result += '0';
    }
    result += createdAt.getDate() + ':';
    if (createdAt.getMonth() < 9) {
      result += '0';
    }
    result += (createdAt.getMonth() + 1) + ':' + createdAt.getFullYear();
    return result;
  }

  static _copyPost(source, target) {
    target.author = source.author;
    target.id = source.id;
    target.createdAt = source.createdAt;
    target.likes = source.likes;
    target.hashtags = source.hashtags;
    target.photoLink = source.photoLink;
  }

  static _showUsername(userName, temp) {
    let p = temp.querySelectorAll('p');
    p[0].innerHTML = userName;
  }

  static _showButtons(temp) {
    let allButtons = temp.querySelectorAll(".button");
    let exitButton = allButtons[0];
    let addButton = allButtons[1];

    if (main.getUserName() !== "") {
      exitButton.innerHTML = "Выйти";
      addButton.style.display = "inline-block";
    } else {
      exitButton.innerHTML = "Войти";
      addButton.style.display = "none";
    }
  }

  static getPhotos(post) {
    let template = document.querySelector("#photo-template");
    template.parentNode.appendChild(this._createPost(post));
  }

  static showUserInfo(photolink, userName) {
    let template = document.getElementsByClassName('right_panel')[0];
    let img = template.querySelector("img");
    img.src = photolink;
    View._showUsername(userName, template);
    View._showButtons(template);

  }

  static delete(id) {
    let full = document.getElementById("photo-template");
    let toDelete = document.getElementById(id);
    if (toDelete !== null) {
      full.parentNode.removeChild(toDelete);
    }
  }

  static edit(post, postToEdit) {
    let full = document.getElementById("photo-template");
    let toEdit = document.getElementById(post.id);
    if (toEdit !== null) {
      this._copyPost(post, postToEdit);
      full.parentNode.replaceChild(this._createPost(postToEdit), toEdit);
    }

  }

  static clear() {
    let full = document.getElementsByClassName("post");
    for (let i = 0; i < full.length; i++) {
      while (full[i])
        full[i].parentNode.removeChild(full[i]);
    }
    let more = document.getElementsByClassName("showMore")[0];
    if(more!==undefined)
        more.parentNode.removeChild(more);
  }

  static showMoreButton(){
    let templ = document.getElementsByClassName("template-showMore")[0];
    let temp = templ.content.cloneNode(true);
    templ.parentNode.appendChild(temp);
    const more = document.getElementsByClassName("showMore")[0];
    more.addEventListener("click", function(event){
        event.preventDefault();
        main.getPhotos(main.getLastFilter(),main.getNumPosts() - main.getMorePosts());
        scroll(0,0);
      });

  }

}
class View {

    static _createPost (post) {
        let template = document.querySelector("#photo-template");
        let temp = template.content.cloneNode(true);

        let name = temp.querySelectorAll("a")[0];
        name.innerHTML = post.author;

        let time = temp.querySelectorAll(".time")[0];
        time.innerHTML = View._createdAtToString(post.createdAt);

        let photo = temp.querySelectorAll(".photo")[0];
        photo.src = post.photoLink;

        let description = temp.querySelectorAll(".about-photo b i")[0];
        description.innerHTML = post.description;

        let likes = temp.querySelectorAll(".like span")[0];
        let str = post.likes[0].toString()+" и еще " +(post.likes.length-1).toString()+" нравится";
        likes.innerHTML = str;

        let tags = temp.querySelectorAll(".hashtags p")[0];
        str = "";
        for (let i = 0; i < post.hashtags.length; i++) {
            str += post.hashtags[i] + " ";
        }
        tags.innerHTML = str;

        let addID = temp.querySelector(".post");
        addID.setAttribute("id", post.id);

        return temp;
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

    static _copyPost (source, target) {
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

    static getPhotos(post){
        let template = document.querySelector("#photo-template");
        template.parentNode.appendChild(this._createPost(post));
    }

    static showUserInfo(photolink, userName){
        let template = document.getElementById('profile-template');
        let temp = template.content.cloneNode(true);
        let img = temp.querySelector("img");
        img.src = photolink;
        View._showUsername(userName, temp);
        template.parentNode.appendChild(temp);
    }

    static delete(id) {
        let full = document.getElementById("photo-template");
        let toDelete = document.getElementById(id);
        if (toDelete !== null){
            full.parentNode.removeChild(toDelete);
        }
    }

    static edit (post, postToEdit) {
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
        while (more.firstChild)
            more.removeChild(more.firstChild);
    }






}
let main = (function() {

  let posts = new PostCollection([{
      id: '1',
      description: 'Привет',
      createdAt: new Date('2019-03-16T22:00:00'),
      author: 'User1',
      photoLink: 'images/1.jpg',
      hashtags: ["#пирог", "#вкусно", "#клубника", "#клубника1", "#клубн2ика", "#к3лубника", "#клу4бника", "#клубника", "#клубника"],
      likes: ["cat"],
    },
    {
      id: '2',
      description: 'Кот',
      createdAt: new Date('2019-03-16T21:10:00'),
      author: 'cat',
      photoLink: 'images/2.jpg',
      hashtags: ["#кот", "#привет", "#cat"],
      likes: ["Max", "Petr", "Anna", "Maria"]
    },
    {
      id: '3',
      description: 'Привет 2 раз',
      createdAt: new Date('2019-03-16T20:03:00'),
      author: 'User1',
      photoLink: 'images/1.jpg',
      hashtags: ["#улица", "#street", "#hello"],
      likes: ["Anna", "Max", "Petr"]
    },
    {
      id: '4',
      description: 'Друзья',
      createdAt: new Date('2019-03-15T22:00:00'),
      author: 'User3',
      photoLink: 'images/3.jpg',
      hashtags: ["#друзья", "#friends", "#smile"],
      likes: ["Kate", "Mur", "Kirill11", "Vika"]
    },
    {
      id: '5',
      description: 'Пирог',
      createdAt: new Date('2019-03-15T15:45:00'),
      author: 'User1',
      photoLink: 'images/4.jpg',
      hashtags: ["#пирог", "#вкусно", "#очень"],
      likes: ["Petr", "Kate", "Anna", "Kirill11"]
    },
    {
      id: '6',
      description: 'еще один Кот',
      createdAt: new Date('2019-03-15T10:00:00'),
      author: 'User2',
      photoLink: 'images/2.jpg',
      hashtags: ["#кот", "#привет", "#cat"],
      likes: ["Max", "Lucy", "AnnaPetr", "Maria"]
    },
    {
      id: '7',
      description: 'Пирог с клубникой',
      createdAt: new Date('2019-03-14T22:00:00'),
      author: 'Max',
      photoLink: 'images/4.jpg',
      hashtags: ["#пирог", "#вкусно", "#клубника", "#клубника1", "#клубн2ика", "#к3лубника", "#клу4бника", "#клубника", "#клубника"],
      likes: ["Petr", "Kate", "Anna", "Kirill11"]
    },
    {
      id: '8',
      description: 'Друзья',
      createdAt: new Date('2019-03-13T22:00:00'),
      author: 'Petr',
      photoLink: 'images/3.jpg',
      hashtags: ["#друзья", "#friends", "#smile"],
      likes: ["Lucy", "Anna", "Kirill11", "Vika"]
    },
    {
      id: '9',
      description: 'Песик',
      createdAt: new Date('2019-03-12T22:00:00'),
      author: 'Petr',
      photoLink: 'images/4.jpg',
      hashtags: ["#друзья", "#складочки"],
      likes: ["Lucy", "Anna", "Kirill11", "Kate"]
    },
    {
      id: '10',
      description: 'Привет 3 раз(мне скучно))))',
      createdAt: new Date('2019-03-11T22:00:00'),
      author: 'Anna',
      photoLink: 'images/1.jpg',
      hashtags: ["#улица", "#солнце", "#hello"],
      likes: ["Anna", "Lucy", "Petr"]
    },
    {
      id: '11',
      description: 'Друзья мои',
      createdAt: new Date('2019-03-10T22:00:00'),
      author: 'Lucy',
      photoLink: 'images/3.jpg',
      hashtags: ["#друзья", "#ЯКакОбычно", "#smile"],
      likes: ["Petr", "Anna", "Kirill11", "Vika"]
    },
    {
      id: '12',
      description: 'Мой Песик еще раз',
      createdAt: new Date('2019-03-09T15:47:00'),
      author: 'Lucy',
      photoLink: 'images/4.jpg',
      hashtags: ["#друзья", "#складочки", "#любовь"],
      likes: ["Lucy", "Anna", "Kirill11", "Kate"]
    },
    {
      id: '13',
      description: 'еще второй Кот',
      createdAt: new Date('2019-03-08T15:57:00'),
      author: 'User2',
      photoLink: 'images/2.jpg',
      hashtags: ["#кот", "#привет", "#cat"],
      likes: ["Max", "Lucy", "AnnaPetr", "Maria"]
    },
    {
      id: '14',
      description: 'Мой Песик еще один раз',
      createdAt: new Date('2019-03-07T15:47:00'),
      author: 'Lucy',
      photoLink: 'images/4.jpg',
      hashtags: ["#друзья", "#складочки", "#любовь"],
      likes: ["Lucy", "Anna", "Kirill11", "Kate"]
    },
    {
      id: '15',
      description: 'еще третий Кот',
      createdAt: new Date('2019-03-06T15:47:00'),
      author: 'User2',
      photoLink: 'images/2.jpg',
      hashtags: ["#кот", "#привет", "#cat"],
      likes: ["Max", "Lucy", "AnnaPetr", "Maria"]
    },
    {
      id: '16',
      description: 'Мой Песик(песика много не бывает)',
      createdAt: new Date('2019-03-05T15:47:00'),
      author: 'Lucy',
      photoLink: 'images/4.jpg',
      hashtags: ["#друзья", "#складочки", "#любовь"],
      likes: ["Lucy", "Anna", "Kirill11", "Kate"]
    },
    {
      id: '17',
      description: 'еще четвертый Кот',
      createdAt: new Date('2019-03-04T15:47:00'),
      author: 'User2',
      photoLink: 'images/2.jpg',
      hashtags: ["#кот", "#привет", "#cat"],
      likes: ["Max", "Lucy", "AnnaPetr", "Maria"]
    },
    {
      id: '18',
      description: 'Мой Песик(нет, мне не надоело)',
      createdAt: new Date('2019-03-03T15:47:00'),
      author: 'Lucy',
      photoLink: 'images/4.jpg',
      hashtags: ["#друзья", "#складочки", "#любовь"],
      likes: ["Lucy", "Anna", "Kirill11", "Kate"]
    },
    {
      id: '19',
      description: 'еще пятый Кот',
      createdAt: new Date('2019-03-02T15:47:00'),
      author: 'User2',
      photoLink: 'images/2.jpg',
      hashtags: ["#кот", "#привет", "#cat"],
      likes: ["Max", "Lucy", "AnnaPetr", "Maria"]
    },
    {
      id: '20',
      description: 'Мой Песик(последний)',
      createdAt: new Date('2019-03-01T15:47:00'),
      author: 'Lucy',
      photoLink: 'images/4.jpg',
      hashtags: ["#друзья", "#складочки", "#любовь"],
      likes: ["Lucy", "Anna", "Kirill11", "Kate"]
    },
  ]);
  let userName = "";
  let numPosts = 0;
  let lastFilter = {};

  return {

    getUserName() {
      return userName;
    },

    showUserInfo(username, photolink) {
      View.showUserInfo(photolink, username);
    },

    logIn(username) {
      userName = username;
      this.showUserInfo(userName, "images/2.jpg");
      this.getPhotos({});
    },

    logOut() {
      userName = "";
      this.getPhotos({});
    },

    clear() {
      View.clear();
    },

    getNumPosts(){
      return posts._photoPosts.length;
    },

    getMorePosts(){
      return posts.getNumber();
    },

    getLastFilter(){
      return this.lastFilter;
    },

    replaceLocalPhotoPosts(){
      let webPosts = JSON.parse(localStorage.getItem("Posts"));
      webPosts.forEach(post=>post.createdAt = new Date(post.createdAt));
      posts = new PostCollection(webPosts);
    },

    replaceSomePhotoPosts(indexStartPost, post){
      posts._photoPosts.splice(indexStartPost, 1, post);
      localStorage["Posts"] = JSON.stringify(this.getPhotoposts());
    },

    getPhotos(filterConfig, skip = 0, top = 10) {
      View.clear();
      this.lastFilter = filterConfig;
      let result = posts.getPage(filterConfig, skip, top);
      for (let i = 0; i < result.length; i++)
        View.getPhotos(result[i]);
      if(this.getMorePosts()>=1)
        View.showMoreButton();
      return result;
    },

    getPost(id) {
      return posts.get(id);
    },

    addPhotoPost(post) {
      if (posts.add(post)) {
        this.getPhotos({});
        localStorage["Posts"] = JSON.stringify(this.getPhotoposts());
        return true;
      }
      return false;
    },

    deletePhotoPost(id) {
      if (posts.remove(id)) {
        View.delete(id);
        localStorage["Posts"] = JSON.stringify(this.getPhotoposts());
        return true;
      } else return false;
    },

    replacePost(old, newPost) {
      posts.replace(old, newPost);
    },

    editPhotoPost(id, post) {
      post.author = this.getPost(id).author;
      post.createdAt = this.getPost(id).createdAt;
      post.id = id;

      if (posts.edit(id, post)) {
        View.edit(posts.get(id), post);
        localStorage["Posts"] = JSON.stringify(this.getPhotoposts());
        return true;
      } else return false;
    },

    start(){
      if(localStorage["Posts"]!=="a")
      this.replaceLocalPhotoPosts();
      else
      localStorage["Posts"] = JSON.stringify(this.getPhotoposts());
      main.logIn("cat");
    },

    getPhotoposts() {
      return posts._photoPosts;
    },

  }
}());

if(localStorage["Posts"]===undefined)
localStorage.setItem("Posts","a");
main.start();
// main.getPhotos({});
// // main.showUserInfo("Cat","images/2.jpg");
// main.addPhotoPost({
//   id: '21',
//   description: 'этот пост добавится',
//   createdAt: new Date('2019-04-01T15:47:00'),
//   author: 'Lucy',
//   photoLink: 'images/4.jpg',
//   hashtags: ["#друзья", "#складочки", "#любовь"],
//   likes: ["Lucy", "Anna", "Kirill11", "Kate"]
// }, );
// main.deletePhotoPost("21");
// main.logIn("cat");
// main.editPhotoPost("1", {
//   description: 'этот пост добавится',
// });

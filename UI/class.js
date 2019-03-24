class PostCollection {

    constructor(photoPosts) {
        this._photoPosts = photoPosts.filter(post=>PostCollection.validate(post));
        this._sortPostsByDate = function compare(left, right) {
            return right.createdAt - left.createdAt;
        }
    }

    static _isCorrectHashtags(array){
        if(Array.isArray(array)){
            if(Array.prototype.every.call(array,item=>(typeof(item) == 'string')&& (item.charAt(0) === '#') )){
                return true;
            }
        }
        return false;
    };

    static _isCorrectLikes(array){
        if(Array.isArray(array)){
            if(Array.prototype.every.call(array,item=>(typeof(item) == 'string'))){
                return true;
            }
        }
        return false;
    };

    static validate(post) {
        if (!post.hasOwnProperty('id') || typeof(post.id) != 'string') {
            return false;
        };
        if (!post.hasOwnProperty('description') || typeof(post.description) != 'string' || !(post.description.length < 200)) {
            return false;
        };
        if (!post.hasOwnProperty('createdAt') || !(post.createdAt instanceof Date)) {
            return false;
        };
        if (!post.hasOwnProperty('author') || typeof(post.author) != 'string' || post.author.length === 0) {
            return false;
        };
        if (!post.hasOwnProperty('photoLink') || typeof(post.photoLink) != 'string' || post.photoLink.length === 0) {
            return false;
        };
        if (post.hasOwnProperty('hashtags')) {
            if (!PostCollection._isCorrectHashtags(post.hashtags)){
                return false;
            }
        };
        if (post.hasOwnProperty('likes')) {
            if (!PostCollection._isCorrectLikes(post.likes)){
                return false;
            }
        };

        return true;
    };

    _isIDExist(id) {
        for (let post of this._photoPosts) {
            if (post.id === id){
                return true;
            }
        }
        return false;

    };

    get(id) {
        for (let post of this._photoPosts) {
            if (post.id === id){
                return post;
            }
        }
        return false;
    };

    remove(id) {
        for (let post of this._photoPosts) {
            if (post.id === id){
                this._photoPosts.splice(this._photoPosts.indexOf(post), 1);
                return true;
            }
        }
        return false;
    };

    add(post) {
        if (PostCollection.validate(post)) {
            if (!this._isIDExist(post.id)) {
                this._photoPosts.push(post);
                return true;
            }
        }
        return false;
    };

    edit(id, whatEdit){
        for (let post of this._photoPosts) {
            if (post.id === id){

                if (whatEdit.hasOwnProperty('description')){
                    if (typeof(whatEdit.description) == 'string' && whatEdit.description.length < 200) {
                        post.description = whatEdit.description;
                    }
                    else {
                        return false;
                    }
                };

                if (whatEdit.hasOwnProperty('hashtags')) {
                    if (PostCollection._isCorrectHashtags(whatEdit.hashtags)){
                        post.hashtags = whatEdit.hashtags;
                    }
                    else {
                        return false;
                    }
                };

                if (whatEdit.hasOwnProperty('photoLink')) {
                    if (typeof(whatEdit.photoLink) == 'string' && whatEdit.photoLink.length !== 0) {
                        post.photoLink = whatEdit.photoLink;
                    }
                    else {
                        return false;
                    }
                };

                if (whatEdit.hasOwnProperty('id') || whatEdit.hasOwnProperty('author') ||
                    whatEdit.hasOwnProperty('createdAt')) {
                    return false;
                }
                return true;
            }
        }
        return false;
    };

    getPage (filterConfig, skip = 0, top = 10){
        let result = this._photoPosts.slice(0,this._photoPosts.length);
        if(filterConfig.hasOwnProperty('author')){
            result = result.filter(post=>post.author === filterConfig.author);
        };

        if(filterConfig.hasOwnProperty('date')){
            if (filterConfig.date instanceof Date) {
                result = result.filter(post=>post.createdAt <= filterConfig.date);
            }
            else {
                result.splice(0, result.length);
            }
        }
        if(filterConfig.hasOwnProperty('hashtags')){
            if (PostCollection._isCorrectHashtags(filterConfig.hashtags)) {
                for(let i = 0; i < filterConfig.hashtags.length; ++i){
                    result = result.filter(post=>post.hashtags.find
                    (post=>post.toLowerCase() === filterConfig.hashtags[i].toLowerCase()));
                };
            }
            else {
                result.splice(0, result.length);
            }
        }
        return result.sort(this._sortPostsByDate).splice(skip, top);
    };

    addAll(postsToAdd){
        let invalidePosts = [];
        postsToAdd.forEach(post=>{
            if(!this.add(post)){
                invalidePosts.push(post);
            }
        });
        return invalidePosts;
    }

    clear(){
        this._photoPosts.splice(0,this._photoPosts.length+1);
        return true;
    }

}

let photoPosts = [
    {
        id: '1',
        description: 'Привет',
        createdAt: new Date('2019-03-16T22:00:00'),
        author: 'User1',
        photoLink: 'D:/Учеба/УП/verstka/images/1',
        hashtags: ['#улица', '#street', '#hello'],
        likes: ["Anna", "Max", "Petr"]
    },
    {
        id: '2',
        description: 'Кот',
        createdAt: new Date('2019-03-16T21:10:00'),
        author: 'User2',
        photoLink: 'D:/Учеба/УП/verstka/images/2',
        hashtags: ["#кот", "#привет", "#cat"],
        likes: ["Max", "Petr", "Anna", "Maria"]
    },
    {
        id: '3',
        description: 'Привет 2 раз',
        createdAt: new Date('2019-03-16T20:03:00'),
        author: 'User1',
        photoLink: 'D:/Учеба/УП/verstka/images/1',
        hashtags: ["#улица", "#street", "#hello"],
        likes: ["Anna", "Max", "Petr"]
    },
    {
        id: '4',
        description: 'Друзья',
        createdAt: new Date('2019-03-15T22:00:00'),
        author: 'User3',
        photoLink: 'D:/Учеба/УП/verstka/images/3',
        hashtags: ["#друзья", "#friends", "#smile"],
        likes: ["Kate", "Mur", "Kirill11", "Vika"]
    },
    {
        id: '5',
        description: 'Пирог',
        createdAt: new Date('2019-03-15T15:45:00'),
        author: 'User1',
        photoLink: 'D:/Учеба/УП/verstka/images/4',
        hashtags: ["#пирог", "#вкусно", "#очень"],
        likes: ["Petr", "Kate", "Anna", "Kirill11"]
    },
    {
        id: '6',
        description: 'еще один Кот',
        createdAt: new Date('2019-03-15T10:00:00'),
        author: 'User2',
        photoLink: 'D:/Учеба/УП/verstka/images/2',
        hashtags: ["#кот", "#привет", "#cat"],
        likes: ["Max", "Lucy", "AnnaPetr", "Maria"]
    },
    {
        id: '7',
        description: 'Пирог с клубникой',
        createdAt: new Date('2019-03-14T22:00:00'),
        author: 'Max',
        photoLink: 'D:/Учеба/УП/verstka/images/4',
        hashtags: ["#пирог", "#вкусно", "#клубника"],
        likes: ["Petr", "Kate", "Anna", "Kirill11"]
    },
    {
        id: '8',
        description: 'Друзья',
        createdAt: new Date('2019-03-13T22:00:00'),
        author: 'Petr',
        photoLink: 'D:/Учеба/УП/verstka/images/3',
        hashtags: ["#друзья", "#friends", "#smile"],
        likes: ["Lucy", "Anna", "Kirill11", "Vika"]
    },
    {
        id: '9',
        description: 'Песик',
        createdAt: new Date('2019-03-12T22:00:00'),
        author: 'Petr',
        photoLink: 'D:/Учеба/УП/verstka/images/4',
        hashtags: ["#друзья", "#складочки"],
        likes: ["Lucy", "Anna", "Kirill11", "Kate"]
    },
    {
        id: '10',
        description: 'Привет 3 раз(мне скучно))))',
        createdAt: new Date('2019-03-11T22:00:00'),
        author: 'Anna',
        photoLink: 'D:/Учеба/УП/verstka/images/1',
        hashtags: ["#улица", "#солнце", "#hello"],
        likes: ["Anna", "Lucy", "Petr"]
    },
    {
        id: '11',
        description: 'Друзья мои',
        createdAt: new Date('2019-03-10T22:00:00'),
        author: 'Lucy',
        photoLink: 'D:/Учеба/УП/verstka/images/3',
        hashtags: ["#друзья", "#ЯКакОбычно", "#smile"],
        likes: ["Petr", "Anna", "Kirill11", "Vika"]
    },
    {
        id: '12',
        description: 'Мой Песик еще раз',
        createdAt: new Date('2019-03-09T15:47:00'),
        author: 'Lucy',
        photoLink: 'D:/Учеба/УП/verstka/images/4',
        hashtags: ["#друзья", "#складочки", "#любовь"],
        likes: ["Lucy", "Anna", "Kirill11", "Kate"]
    },
    {
        id: '13',
        description: 'еще второй Кот',
        createdAt: new Date('2019-03-08T15:57:00'),
        author: 'User2',
        photoLink: 'D:/Учеба/УП/verstka/images/2',
        hashtags: ["#кот", "#привет", "#cat"],
        likes: ["Max", "Lucy", "AnnaPetr", "Maria"]
    },
    {
        id: '14',
        description: 'Мой Песик еще один раз',
        createdAt: new Date('2019-03-07T15:47:00'),
        author: 'Lucy',
        photoLink: 'D:/Учеба/УП/verstka/images/4',
        hashtags: ["#друзья", "#складочки", "#любовь"],
        likes: ["Lucy", "Anna", "Kirill11", "Kate"]
    },
    {
        id: '15',
        description: 'еще третий Кот',
        createdAt: new Date('2019-03-06T15:47:00'),
        author: 'User2',
        photoLink: 'D:/Учеба/УП/verstka/images/2',
        hashtags: ["#кот", "#привет", "#cat"],
        likes: ["Max", "Lucy", "AnnaPetr", "Maria"]
    },
    {
        id: '16',
        description: 'Мой Песик(песика много не бывает)',
        createdAt: new Date('2019-03-05T15:47:00'),
        author: 'Lucy',
        photoLink: 'D:/Учеба/УП/verstka/images/4',
        hashtags: ["#друзья", "#складочки", "#любовь"],
        likes: ["Lucy", "Anna", "Kirill11", "Kate"]
    },
    {
        id: '17',
        description: 'еще четвертый Кот',
        createdAt: new Date('2019-03-04T15:47:00'),
        author: 'User2',
        photoLink: 'D:/Учеба/УП/verstka/images/2',
        hashtags: ["#кот", "#привет", "#cat"],
        likes: ["Max", "Lucy", "AnnaPetr", "Maria"]
    },
    {
        id: '18',
        description: 'Мой Песик(нет, мне не надоело)',
        createdAt: new Date('2019-03-03T15:47:00'),
        author: 'Lucy',
        photoLink: 'D:/Учеба/УП/verstka/images/4',
        hashtags: ["#друзья", "#складочки", "#любовь"],
        likes: ["Lucy", "Anna", "Kirill11", "Kate"]
    },
    {
        id: '19',
        description: 'еще пятый Кот',
        createdAt: new Date('2019-03-02T15:47:00'),
        author: 'User2',
        photoLink: 'D:/Учеба/УП/verstka/images/2',
        hashtags: ["#кот", "#привет", "#cat"],
        likes: ["Max", "Lucy", "AnnaPetr", "Maria"]
    },
    {
        id: '20',
        description: 'Мой Песик(последний)',
        createdAt: new Date('2019-03-01T15:47:00'),
        author: 'Lucy',
        photoLink: 'D:/Учеба/УП/verstka/images/4',
        hashtags: ["#друзья", "#складочки", "#любовь"],
        likes: ["Lucy", "Anna", "Kirill11", "Kate"]
    },

];
let program = new PostCollection(photoPosts);

console.log('program.getPage({})');
console.log(program.getPage({}));
console.log('program.getPage({}, 5, 5)');
console.log(program.getPage({}, 5, 5));
console.log('program.getPage({author: \'User2\'})');
console.log(program.getPage({author: 'User2'}));
console.log('program.getPage({date: new Date(\'2019-03-10T22:00:00\')})');
console.log(program.getPage({date: new Date('2019-03-10T22:00:00')}));
console.log('program.getPage({hashtags: [\'#складочки\']})');
console.log(program.getPage({hashtags: ['#складочки']}));
console.log('program.getPage({author: \'AuthorNotExist\'})');
console.log(program.getPage({author: 'AuthorNotExist'}));
console.log('program.getPage({hashtags: [\'неправильныйВидХештэга\']})');
console.log(program.getPage({hashtags: ['неправильныйВидХештэга']}));
console.log('program.getPage({date: \'Неправильный формат даты\'})');
console.log(program.getPage({date: 'Неправильный формат даты'}));

console.log('program.get(\'4\')');
console.log(program.get('4'));
console.log('program.get(\'25\')');
console.log(program.get('25'));
console.log('program.get(25)');
console.log(program.get(25));

console.log('PostCollection.validate(program.get(\'4\'))');
console.log(PostCollection.validate(program.get('4')));
console.log('Check wrong post');
console.log(PostCollection.validate({
     id: '3',
     description: 'еще второй Кот',
     createdAt: '2019-03-08T15:57:00',
     author: 2,
     photoLink: 'D:/Учеба/УП/verstka/images/2',
     hashtags: ["#кот", "#привет", "#cat"],
     likes: ["Max", "Lucy", "AnnaPetr", "Maria"]
 }));

console.log('Add correct post with ID 21 and check it');
console.log(program.add({
     id: '21',
     description: 'Мой Песик(последний)',
     createdAt: new Date('2019-03-01T15:47:00'),
     author: 'Lucy',
     photoLink: 'D:/Учеба/УП/verstka/images/4',
     hashtags: ["#друзья", "#складочки", "#любовь"],
     likes: ["Lucy", "Anna", "Kirill11", "Kate"]
 }));
console.log(program.getPage({}, 15, 6));
console.log('Add post with existed ID');
console.log(program.add({
     id: '21',
     description: 'Мой Песик(последний)',
     createdAt: new Date('2019-03-01T15:47:00'),
     author: 'Lucy',
     photoLink: 'D:/Учеба/УП/verstka/images/4',
     hashtags: ["#друзья", "#складочки", "#любовь"],
     likes: ["Lucy", "Anna", "Kirill11", "Kate"]
 }));
console.log('Add wrong post');
console.log(program.add({
     id: '21',
 }));

console.log('program.remove(\'21\')');
console.log(program.remove('21'));
console.log(program.getPage({}, 15, 6));
console.log('program.remove(\'21\')');
console.log(program.remove('21'));

console.log('program.edit(\'11\', {description: \'Это мои друзья\', hashtags: [\'#Привет\', \'#hello\', \'#heh\'] })');
console.log(program.edit('11', {description: 'Это мои друзья', hashtags: ['#Привет', '#hello', '#heh'] }));
console.log(program.get('11'));
console.log('program.edit(\'11\', {photoLink: \'\'})');
console.log(program.edit('11', {photoLink: ''}));
console.log('program.edit(\'11\', {id: \'45\' })');
console.log(program.edit('11', {id: '45' }));

console.log('AddAll');
console.log(program.addAll([
    {
        id: '21',
        description: 'этот пост добавится',
        createdAt: new Date('2019-03-01T15:47:00'),
        author: 'Lucy',
        photoLink: 'D:/Учеба/УП/verstka/images/4',
        hashtags: ["#друзья", "#складочки", "#любовь"],
        likes: ["Lucy", "Anna", "Kirill11", "Kate"]
},
    {
        id: '21',
        description: 'этот пост не добавится',
        createdAt: new Date('2019-03-01T15:47:00'),
        author: 'Lucy',
        photoLink: 'D:/Учеба/УП/verstka/images/4',
        hashtags: ["#друзья", "#складочки", "#любовь"],
        likes: ["Lucy", "Anna", "Kirill11", "Kate"]
    },]));
console.log(program.getPage({}, 15, 6));

console.log('program.clear() and program.getPage({}, 0, 20)');
console.log(program.clear());
console.log(program.getPage({}, 0, 20));
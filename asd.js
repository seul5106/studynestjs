class User{

    constructor(user, user2){
        this.user = user;
        this.user2 = user2;
    }

    getUser(){
        return this.user + this.user2
    }

    getUser2(){
        return this.user2
    }
}

const Hi = new User("한슬", "재현");
console.log(Hi.getUser())
class User{
    

    constructor(user, user2){
        this.user = user;
        this.user2 = user2;
        this.setHello = new SetHello("안녕하세요");
    }

    getUser(){
        this.setHello.logger()
        return this.user + this.user2
    }

    getUser2(){
        return this.user2
    }
}

class SetHello{
    constructor(text){
        this.text = text;
    }

    logger(){
        return console.log(this.text);
    }
    
}

const Hi = new User("한슬", "재현");
console.log(Hi.getUser())
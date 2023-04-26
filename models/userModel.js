const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    id:{
        type:Number,
        unique:true
    },
    first_name:{
        type:String,
        required:true,
        unique:true
    },
    last_name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true,
    },
    income:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    car:{
        type:String,
        required:true,
    },
    quote:{
        type:String,
        required:true
    },
    phone_price:{
        type:String,
        required:true
    }
})

//Users which have income lower than $5 USD and have a car of brand “BMW” or “Mercedes”.
userSchema.statics.getData = async function(){
    const users= await this.find({
        $and:[
            {"income":{$lt:'$5'}},
            {
                $or:[
                    {"car":{$eq:"BMW"}},
                    {"car":{$eq:"Mercedes"}}
                ]
            }
        ]
    })
    
    if(!users)throw Error('No User found');
    return users;
}


//Male Users which have phone price greater than 10,000.
userSchema.statics.getUsers = async function(){
    const users = await this.find({
        $and:[
            {"gender":{$eq:"Male"}},
            {"phone_price":{$gt:"10000"}}
        ]
    })
    if(!users)throw Error("No User found");
    return users;
}


//Users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name.
userSchema.statics.getUser = async function(){
    const regex = new RegExp(/.+(\w+)\@/i); // regex to match last name in email
    const users = await this.find(
        {
            $and: [
                { email:{$regex:regex}},
                { last_name: { $regex: /^M/i } },
                { $expr:{$gt:[{$strLenCP:"$quote"},15]},},
            ]
          }
    )

    if(users==[])throw Error("No User found")
    return users;
}


//Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose email does not include any digit.
userSchema.statics.getDatas = async function(){
    const users = await this.find({
        $and:[
            {
                $or:[
                    {"car":{$eq:"BMW"}},
                    {"car":{$eq:"Mercedes"}},
                    {"car":{$eq:"Audi"}}
                ]
            },
            {email:{$not:/\d/}}
        ]
    })
    if(!users) throw Error("No User found");
    return users;
}


//. Show the data of top 10 cities which have the highest number of users and their average income.
userSchema.statics.getUserData = async function(){

    //converting the income String to double values for calculating the income
    incomeConvert = {
        $addFields:{
            incomeOfPeople:{$toDouble:{$substrBytes:["$income",1,5]}}
        }
    }
    const users  =await this.aggregate(
        [
            incomeConvert,
            {$group: {_id: "$city", count: {$sum: 1},average_income:{$avg:"$incomeOfPeople"}}},
            {$sort: {count: -1}},
            {$limit: 10}
        ]    
    )
    if(!users) throw Error("No Users Found!");
    return users;
}

module.exports = mongoose.model('User',userSchema)
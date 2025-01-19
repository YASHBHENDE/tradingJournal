import mongoose, { mongo } from "mongoose";
import { string } from "zod";
const { Schema } = mongoose;
import { mongourl } from "../config";

mongoose.connect(mongourl)

const objectId = mongoose.Schema.ObjectId
const tradesSchema = new Schema({
    id:{type:objectId},
    userid:{type:objectId,ref:'User',},
    tradeTakeDate: { type: Date, required: true },
    tradeExitDate: { type: Date },
    tradeStatus: { type: String, enum: ['live', 'exited'], required: true },
    tradeImgBefore: { type: String },
    tradeImgAfter: { type: String },
})

const userSchema = new Schema({
    id:{type:objectId},
    email:String,
    password:string,
    trades: [{ type: Schema.Types.ObjectId, ref: "Trades" }],

})
const User = mongoose.model('User',userSchema)
const Trades = mongoose.model('Trades',tradesSchema)


export {User,Trades}
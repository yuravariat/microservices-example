import mongoose from "mongoose";
import { Password } from '../services/password'

// An interface that describes the properties that are required to create a new User
interface IUser{
    email: string;
    password: string;
}

// An interface that describes the properties that User Model has
interface UserModel extends mongoose.Model<UserDoc>{
    build(user: IUser): UserDoc;
}

// An interfaces that describes the properties that User document has
interface UserDoc extends mongoose.Document{
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        // transformation before JSON stringify.
       transform(doc, ret){
            delete ret.password;
            delete ret.__v;
            ret.id = ret._id;
            delete ret._id;
       } 
    }
});

userSchema.pre('save', async function(done){
    if(this.isModified('password')){
        const hashedPsw = await Password.toHash(this.get('password'));
        this.set('password', hashedPsw);
    }
});

userSchema.statics.build = (user: IUser) => {
    return new User(user);
};

const User: UserModel = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User, UserDoc };
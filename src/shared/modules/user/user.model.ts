import { Schema, Document, model } from 'mongoose';
import { User } from '../../types/index.js';

export interface UserDocument extends User, Document {
  createdAt: Date,
  updatedAt: Date,
}

const userSchema = new Schema({
  name:{
    type: String,
    unique: true,
    required: true,
    minlength: [2, 'Min length for firstname is 2']
  },
  email:{
    type: String,
    unique: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
    required: true,
  },
  avatarPath:{
    type: String,
    minlength: [5, 'Min length for avatar path is 5'],
    required: false,
  },
  password:String,
  userType:String,
}, { timestamps: true });

export const UserModel = model<UserDocument>('User', userSchema);

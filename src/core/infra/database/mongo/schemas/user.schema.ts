import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  // toJSON: {
  //   virtuals: true,
  //   getters: true,
  // },
  toObject: {
    virtuals: true,
  },
})
export class User {
  @Prop({ type: String, unique: true, index: 1, required: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [String], required: true })
  roles: string[];
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('pets', {
  ref: 'Pet',
  localField: '_id',
  foreignField: 'user',
  justOne: false,
});

export { UserSchema };

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Connection, Document, Types } from 'mongoose';
import { applyAutoIncrement } from 'src/utils/apply-auto-increment';

// MongoDB의 가장 작은 단위가 Document, 모듈에서 사용할 타입을 export 시켜줌
export type UsersDocument = Users & Document;

@Schema()
export class Users {
  readonly _id: Types.ObjectId;
  readonly index: number;

  @Prop({ required: true })
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  signupVerifyToken: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);

export const UsersFactory = (connection: Connection) => {
  const schema = applyAutoIncrement(connection, Users.name, UsersSchema);
  return schema;
};

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Connection, Document, Types } from 'mongoose';
import { applyAutoIncrement } from '../../utils/apply-auto-increment';

// MongoDB의 가장 작은 단위가 Document, 모듈에서 사용할 타입을 export 시켜줌
export type BiosDocument = Bios & Document;

@Schema()
export class Bios {
  readonly _id: Types.ObjectId;

  @Prop({ type: Object })
  name: {
    first: string;
    last: string;
  };

  @Prop()
  birth: string;

  @Prop()
  death?: string;

  @Prop()
  contribs: [string];

  @Prop({ type: Array })
  awards?: [{ award: string; year: number; by: string }];
}

export const BiosSchema = SchemaFactory.createForClass(Bios);

export const BiosFactory = (connection: Connection) => {
  const schema = applyAutoIncrement(connection, Bios.name, BiosSchema);
  return schema;
};

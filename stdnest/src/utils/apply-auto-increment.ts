import { Connection, Schema } from 'mongoose';
import * as AutoIncrementFactory from 'mongoose-sequence';

let AutoIncrement: any;
export function applyAutoIncrement(
  connection: any,
  name: string,
  _schema: Schema,
) {
  const schema = _schema;

  console.log('오토인크리즈먼트');

  if (AutoIncrement === undefined) {
    AutoIncrement = AutoIncrementFactory(connection);
  }

  try {
    schema.plugin(AutoIncrement, {
      id: name + '_index',
      inc_field: 'index',
      start_seq: 1,
    });
  } catch (e) {
    throw e;
  }

  return schema;
}

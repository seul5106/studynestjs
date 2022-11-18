import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import * as uuid from 'uuid';

import { Bios, BiosDocument } from './exmongoose.schema';

interface MongooseInfo {
  birth: string;
}

@Injectable()
export class ExMongooseService {
  // 물어볼것!!!
  private readonly logger = new Logger(ExMongooseService.name);

  constructor(
    @InjectModel(Bios.name) private ExMongooseModel: Model<BiosDocument>,
  ) {}

  async getBios() {
    // const users = await this.ExMongooseModel.find({});
    // this.logger.log(users);
    // return {
    //   birth: users,
    // };
    const users = new this.ExMongooseModel({
      name: {
        first: 'Jeong123',
        last: 'HanSeul123',
      },
      contribs: ['scv123', 'asdf'],
    });
    users.save();
  }
}

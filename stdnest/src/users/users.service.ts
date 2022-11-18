import {
  Injectable,
  UnprocessableEntityException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { EmailService } from '../email/email.service';
import * as uuid from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { Users, UsersDocument } from './users.schema';

interface UserInfo {
  name: string;
  email: string;
}

@Injectable()
export class UsersService {
  // 물어볼것!!!
  private logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
    private emailService: EmailService,
    private authService: AuthService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const userExist = await this.checkUserExists(createUserDto.email);
    if (userExist) {
      this.logger.error('해당 이메일로는 가입할 수 없습니다.');
      throw new UnprocessableEntityException(
        '해당 이메일로는 가입할 수 없습니다.',
      );
    }
    const signupVerifyToken = uuid.v1();
    await this.saveUser(
      createUserDto.name,
      createUserDto.email,
      createUserDto.password,
      signupVerifyToken,
    );
    await this.sendMemberJoinEmail(createUserDto.email, signupVerifyToken);
  }

  private async checkUserExists(emailAddress: string): Promise<boolean> {
    const users = await this.usersModel.findOne({ email: emailAddress });
    return users !== null;
  }

  private saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    try {
      const result = new this.usersModel({
        name: name,
        email: email,
        password: password,
        signupVerifyToken: signupVerifyToken,
      });
      this.logger.log('회원 데이터가 저장되었습니다');
      return result.save();
    } catch (err) {
      console.log(err);
    }
  }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }

  async verifyEmail(signupVerifyToken: string): Promise<string> {
    const user = await this.usersModel.findOne({
      signupVerifyToken: signupVerifyToken,
    });

    if (user === null) {
      throw new NotFoundException('유저가 존재하지 않습니다');
    }

    return this.authService.login({
      name: user.name,
      email: user.email,
    });
  }

  async login(email: string, password: string): Promise<string> {
    const users = await this.usersModel.findOne({
      email: email,
      password: password,
    });

    if (users === null) {
      throw new NotFoundException('유저가 존재하지 않습니다');
    }

    return this.authService.login({
      name: users.name,
      email: users.email,
    });
  }

  // Promise<UserInfo>
  async getUserInfo(userId: string): Promise<UserInfo> {
    const users = await this.usersModel.findOne({ email: userId });

    if (users === null) {
      throw new NotFoundException('유저가 존재하지 않습니다');
    }

    return {
      name: users.name,
      email: users.email,
    };
  }
}

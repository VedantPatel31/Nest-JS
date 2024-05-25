import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { signupDto } from './dto/signup.dto';
import { loginDto } from './dto/login.dto';
import { log } from 'console';
import { use } from 'passport';
import { MailerService } from 'src/mailer/mailer.service';
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel:Model<User>,
        private jwtService : JwtService,
        private readonly mailerService: MailerService
    ){}

    async signUp(signupDto:signupDto){
        const {name,email,password} = signupDto;
        const hashedPassword = await bcrypt.hash(password,10);

        const user = await this.userModel.create({
            name:name,
            email:email,
            passport:hashedPassword
        })

        await this.mailerService.sendMail(
            email,
            'welcome to our company',
            'hello '+name
        );
        
        const token = this.jwtService.sign({id:user._id});

        return(token);
    }

    async login(loginDto : loginDto){
        const {email,password} = loginDto;    
        const user = await this.userModel.findOne({email});
        if(!user){
            throw new UnauthorizedException("Invalid Credentials")
        }

        const isPassworddMatch = await bcrypt.compare(password,user.passport);
        if(!isPassworddMatch){
            throw new UnauthorizedException("Invalid Password")
        }

        const token = this.jwtService.sign({id:user._id});
        return(token);
    }
    validateToken(token:string){
        return this.jwtService.verify(token,{
            secret:process.env.JWT_SECRET
        });
    }
}

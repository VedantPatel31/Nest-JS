import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signupDto } from './dto/signup.dto';
import { loginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService:AuthService
    ){}

    @Post('/signup')
    signup(@Body()signupDto:signupDto){
        return this.authService.signUp(signupDto);
    }

    @Post('/login')
    login(@Body()loginDto){
        return this.authService.login(loginDto);
    }
}

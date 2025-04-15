import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
 constructor(private readonly jwtService: JwtService) {}

  async generateSuperAdminToken(email: string, password: string): Promise<string> {
    const payload = {
      email,
      password, 
      role: 'superadmin',
    };

    return this.jwtService.signAsync(payload); 
  }
}

import { Injectable } from '@nestjs/common';
import { ProfileDto } from 'src/dto/ProfileDto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProfileService {
    constructor(private userService: UserService) {}

    private Porfile=[ {
      userId: 1,
      bio: 'Initial bio',
    },];
  

    getAllProfiles(){
      return this.Porfile;
    }

    createProfile(profile:ProfileDto){
        const user=this.userService.findUserById(profile.userId)
        if(!user){
            return  `User Does Not Exists`
        }

        const newProfile={
            userId:profile.userId,
            bio:profile.bio
        }
        this.Porfile.push(newProfile);
        return newProfile;
    }

    getProfileForUser(userId){
        const user=this.userService.findUserById(userId)
        if (!user) {
            throw new Error('User not found');
          }
          const profile = this.Porfile.find(p => p.userId == userId);
          if (!profile) {
            throw new Error('Profile not found');
          }

          return {
            ...profile,
            name: user.username,
          };
      

    }

    deleteProfileById(id){

      return this.Porfile= this.Porfile.filter((prof)=>prof.userId!=id)

    }

    updateProfileById(id: number, profile: ProfileDto) {
      const existingProfile = this.Porfile.find((p) => p.userId === id);
      
      if (!existingProfile) {
        return { message: 'Profile not found' };
      }
    
      existingProfile.bio = profile.bio;
    
      return {
        message: 'Profile updated successfully',
        profile: existingProfile,
      };
    }
    



}

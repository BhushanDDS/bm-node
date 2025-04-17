import {Entity,Column,PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Auth{
@PrimaryGeneratedColumn()
id:number;

@Column({type:'varchar', length:55})
fullname:string;

@Column({type:'varchar', length:55})
email:string;

@Column({type:'varchar', length:20})
password:string;

@Column({type:'smallint',default:0})
isActive:boolean;


@Column({
    type: 'simple-array',
  })
  roles: string[];

// @Column({
//     type: 'enum',
//     enum: Role,
//     default: Role.USER, 
//   })
//   role: Role;

}
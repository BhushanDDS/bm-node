import { SetMetadata } from "@nestjs/common";

export const key ='id';
export const DemoMeta=(id:number)=>SetMetadata(key,id);

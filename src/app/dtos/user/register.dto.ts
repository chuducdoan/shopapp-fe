import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RegisterDTO {
    @IsString()
    @IsNotEmpty()
    fullname: string;

    @IsNumber()
    @IsNotEmpty()
    phone_number: number;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    password: string;
    
    @IsString()
    @IsNotEmpty()
    retype_password: string;

    @IsDate()
    @IsNotEmpty()
    date_of_birth: Date;
    
    @IsNumber()
    @IsNotEmpty()
    facebook_account_id: number;
    
    @IsNumber()
    @IsNotEmpty()
    google_account_id: number;
    
    @IsNumber()
    @IsNotEmpty()
    role_id: number = 1;

    constructor(data: any){
        this.fullname = data.fullname;
        this.phone_number = data.phone_number;
        this.address = data.address;
        this.password = data.password;
        this.retype_password = data.retype_password;
        this.date_of_birth = data.date_of_birth;
        this.facebook_account_id = data.facebook_account_id;
        this.google_account_id = data.google_account_id;
        this.role_id = data.role_id;
    }
}
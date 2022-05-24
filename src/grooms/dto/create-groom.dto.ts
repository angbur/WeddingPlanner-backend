import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateGroomDto {

    @ApiProperty()  
    @IsNumber()
    phone: number;

    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsNumber()
    weddingId: number;
}

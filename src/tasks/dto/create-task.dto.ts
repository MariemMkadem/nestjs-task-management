import { IsNotEmpty } from "class-validator";

export class CreaTeTaskDto {
    @IsNotEmpty()
    title: string ;

    @IsNotEmpty()
    description: string;
}
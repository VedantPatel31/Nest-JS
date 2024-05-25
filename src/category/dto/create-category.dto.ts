import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
    @ApiProperty({
        description:"The name of the category",
        type:String,
        example:"Category 1"
    })
    readonly name:string;
}

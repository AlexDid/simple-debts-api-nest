import {IsNotEmpty, IsString, Length} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class CreateDebtSingleDto {
    @ApiModelProperty({
        description: 'virtual user name',
        required: true,
        type: 'string'
    })
    @IsNotEmpty()
    @IsString()
    @Length(0, 30)
    userName: string;

    @ApiModelProperty({
        description: 'ISO2 country code of currency you use',
        required: true,
        type: 'string'
    })
    @IsNotEmpty()
    @IsString()
    @Length(3, 3)
    currency: string;

    constructor(userName: string, currency: string) {
        this.userName = userName;
        this.currency = currency;
    }
}

import {Body, Controller, Delete, Param, Post, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiBearerAuth, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {OperationsService} from '../services/operations.service';
import {CreateOperationDto} from '../models/create-operation.dto';
import {ReqUser} from '../../../common/decorators/request-user.decorator';
import {SendUserDto} from '../../users/models/user.dto';
import {DebtResponseDto} from '../../debts/models/debt-response.dto';
import {DebtsService} from '../../debts/services/debts/debts.service';
import {IdParamDto} from '../../../common/classes/id-param.dto';

@ApiResponse({
  status: 201,
  type: DebtResponseDto
})
@ApiResponse({
  status: 400,
  description: 'Bad Request'
})
@ApiBearerAuth()
@ApiUseTags('operations')
@Controller('operations')
export class OperationsController {

  constructor(
    private readonly operationsService: OperationsService,
    private readonly debtsService: DebtsService
  ) {}



  @UseGuards(AuthGuard())
  @Post()
  async createOperation(
    @Body() createOperationDto: CreateOperationDto,
    @ReqUser() user: SendUserDto
  ): Promise<DebtResponseDto> {
    const debt = await this.operationsService.createOperation(
      user,
      createOperationDto.debtsId,
      createOperationDto.moneyAmount,
      createOperationDto.moneyReceiver,
      createOperationDto.description
    );

    return this.debtsService.getDebtsById(user.id, debt._id)
  }



  @UseGuards(AuthGuard())
  @Delete(':id')
  async deleteOperation(
    @Param() params: IdParamDto,
    @ReqUser() user: SendUserDto
  ) {
    const debt = await this.operationsService.deleteOperation(user.id, params.id);

    return this.debtsService.getDebtsById(user.id, debt._id)
  }



  @UseGuards(AuthGuard())
  @Post(':id/creation/accept')
  async acceptOperation(
    @Param() params: IdParamDto,
    @ReqUser() user: SendUserDto
  ) {
    const debt = await this.operationsService.acceptOperation(user, params.id);

    return this.debtsService.getDebtsById(user.id, debt._id)
  }



  @UseGuards(AuthGuard())
  @Post(':id/creation/decline')
  async declineOperation(
    @Param() params: IdParamDto,
    @ReqUser() user: SendUserDto
  ) {
    const debt = await this.operationsService.declineOperation(user, params.id);

    return this.debtsService.getDebtsById(user.id, debt._id);
  }
}

import { Controller, Param, Get, Patch, Body, UseGuards, ParseIntPipe, ValidationPipe} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto } from './dto/customer.dto';
import { AuthGuard } from '@nestjs/passport';
import { IsCustomerGuard } from 'src/auth/guards';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }
    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    findCustomerProfile(@Param('id', ParseIntPipe) id: number){
        return this.customerService.findCustomerProfile(id)
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'), IsCustomerGuard)
    updateCustomerProfile(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) profileUpdate: CustomerDto){
        return this.customerService.updateCustomerProfile(id, profileUpdate)
    }


}

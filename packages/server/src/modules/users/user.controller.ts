import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    UseGuards,
    UseInterceptors,
    ClassSerializerInterceptor,
    Query,
    Put,
} from "@nestjs/common";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { CreateUserDto, ChangPasswordDto } from "@src/dto/user.dto";
import { JwtGuard } from "@src/guards/jwt.guard";
import { ForRoles } from "@src/guards/role.decorator";
import { RoleGuard } from "@src/guards/role.guard";
import { AdminRole } from "@src/models/Admin";
import { UserService } from "@src/modules/users/user.service";

@Controller("user")
@ApiTags("user")
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("profile")
    @UseGuards(JwtGuard)
    async profile(@Req() req) {
        return this.userService.getProfile(req.user.id);
    }

    @Post("/")
    @ApiConsumes("application/json", "application/x-www-form-urlencoded")
    @UseGuards(JwtGuard, RoleGuard)
    @ForRoles(AdminRole.ADMIN, AdminRole.EMPLOYEE)
    create(@Body() body: CreateUserDto) {
        return this.userService.create(
            body.name,
            body.email,
            body.password,
            body.phone,
        );
    }

    @Get("profile/accountnumber")
    @UseGuards(JwtGuard)
    async getProfileWithAccountNumber(@Query() query) {
        return this.userService.getProfileWithAccountNumber(query.number);
    }

    @Get("transaction/send")
    @UseGuards(JwtGuard)
    getMySendTransaction(@Req() req) {
        return this.userService.getMySendTransaction(req.user.id);
    }

    @Get("transaction/receive")
    @UseGuards(JwtGuard)
    getMyReceiveTransaction(@Req() req) {
        return this.userService.getMyReceiveTransaction(req.user.id);
    }

    @Get("transaction/debt")
    @UseGuards(JwtGuard)
    getMyDebtPayTransaction(@Req() req) {
        return this.userService.getMyDebtPayTransaction(req.user.id);
    }

    @Put("password")
    @UseGuards(JwtGuard)
    changePassword(@Req() req, @Body() body: ChangPasswordDto) {
        return this.userService.changePassword(
            req.user.id,
            body.oldPassword,
            body.newPassword,
        );
    }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import {
  ParseEntityPipe,
  ParsePublicationDtoPipe,
  ValidationPipe,
} from './../utils/validators/validation.pipes';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { DbPublicationDto } from './dto/db-publication.dto';
import { Publication } from './entities/publication.entity';
import { PublicationService } from './publication.service';

@Controller('publications')
@ApiTags('Publications')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Post()
  @ApiBearerAuth()
  @HttpCode(201)
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({
    type: DbPublicationDto,
    status: HttpStatus.CREATED,
  })
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Request() request: any,
    @Body(ValidationPipe, ParsePublicationDtoPipe) dto: CreatePublicationDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.publicationService.create(request.user, dto, file);
  }

  @Get()
  @ApiOkResponse({
    type: Array<DbPublicationDto>,
  })
  findAll() {
    return this.publicationService.findAll();
  }

  @Get('/profile/:id')
  @ApiOkResponse({
    type: Array<DbPublicationDto>,
  })
  findByUser(@Param('id', ParseEntityPipe) user: User) {
    return this.publicationService.findByUserId(user.id);
  }

  @Get(':id')
  @ApiOkResponse({
    type: DbPublicationDto,
  })
  findOne(@Param('id', ParseEntityPipe) publication: Publication) {
    return this.publicationService.findOne(publication);
  }

  @Patch(':id')
  @ApiOkResponse({
    type: DbPublicationDto,
  })
  update(
    @Request() req: any,
    @Param('id') publication: Publication,
    @Body(ValidationPipe, ParsePublicationDtoPipe) dto: CreatePublicationDto,
  ) {
    return this.publicationService.update(req.user, publication, dto);
  }

  @Delete(':id')
  remove(
    @Request() req: any,
    @Param('id', ParseEntityPipe) publication: Publication,
  ) {
    return this.publicationService.remove(req.user, publication.id);
  }

  // TODO: GET COMMENTS BY PUBLICATION
  // TODO: GET REACTION BY PUBLICATION
}

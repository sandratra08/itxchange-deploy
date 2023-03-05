import { CreatePublicationDto } from './../../publication/dto/create-publication.dto';
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { DataSource, Entity, EntityTarget } from 'typeorm';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);

    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}

@Injectable()
export class ParseEntityPipe
  implements PipeTransform<string, Promise<EntityTarget<typeof Entity>>>
{
  constructor(private dataSource: DataSource) {}
  async transform(
    value: string,
    { metatype }: ArgumentMetadata,
  ): Promise<EntityTarget<typeof Entity>> {
    const id = parseInt(value, 10);
    if (isNaN(id)) {
      throw new BadRequestException('Invalid Number');
    }

    const object = await this.dataSource.manager.findOneBy(metatype, { id });

    if (!object) {
      throw new NotFoundException(`${metatype.name} Not Found`);
    }
    return object;
  }
}

@Injectable()
export class ParsePublicationDtoPipe
  implements PipeTransform<CreatePublicationDto, CreatePublicationDto>
{
  transform(
    value: CreatePublicationDto,
    {}: ArgumentMetadata,
  ): CreatePublicationDto {
    const tags = value.tags.toString();
    value.tags = tags.split(',');
    return value;
  }
}

@Injectable()
export class RequiredFileValidationPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    return value !== null;
  }
}

export abstract class FileValidator<TValidationOptions = Record<string, any>> {
  constructor(protected readonly validationOptions: TValidationOptions) {}

  /**
   * Indicates if this file should be considered valid, according to the options passed in the constructor.
   * @param file the file from the request object
   */
  abstract isValid(file?: any): boolean | Promise<boolean>;

  /**
   * Builds an error message in case the validation fails.
   * @param file the file from the request object
   */
  abstract buildErrorMessage(file: any): string;
}

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    // "value" is an object containing the file's attributes and metadata
    const tenMb = 10000;
    return value.size < tenMb;
  }
}

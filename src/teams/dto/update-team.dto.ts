import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamDto } from './create-team.dto';
import { Player } from '@prisma/client';

export class UpdateTeamDto extends PartialType(CreateTeamDto) {
    //players: Player[];
}

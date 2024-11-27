import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PlayersService {
  db: PrismaService;

  constructor(db: PrismaService) {
    this.db = db;
  }

  create(createPlayerDto: CreatePlayerDto) {
    return this.db.player.create({data: {name: createPlayerDto.name, goalCount: createPlayerDto.goalCount, birthDate: createPlayerDto.birthDate + "T00:00:00Z"}});
  }

  findAll() {
    return this.db.player.findMany();
  }

  async findOne(id: number) {
    try{
      return await this.db.player.findFirst({where:{id}});
    }
    catch{return undefined;}
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto) {
    try{
      if(await this.db.player.findFirst({where:{id}}) == null) return undefined;
      return await this.db.player.update({where: {id}, data: updatePlayerDto});
    }
    catch {return undefined;}
  }

  async remove(id: number) {
    try{
      return await this.db.player.delete({where: {id}});
    }
    catch {return undefined;}
  }
}

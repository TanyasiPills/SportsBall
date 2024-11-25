import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TeamsService {

  db: PrismaService;

  constructor(db: PrismaService){
    this.db = db;
  }

  create(createTeamDto: CreateTeamDto) {
    return this.db.team.create({data: createTeamDto});
  }

  async addPlayer(id: number, playerid: number){
    try{
      return await this.db.team.update({where: {id}, data: {players: {connect: {id: playerid}}}, include: {players: true}});
    }
    catch {return undefined;}
  }

  async deletePlayer(id: number, playerid: number){
    try{
      return await this.db.team.update({where: {id}, data: {players: {disconnect: {id: playerid}}}, include: {players: true}});
    }
    catch {return undefined;}
  }

  async getAllPlayerTeam(){
    try{
      return await this.db.team.findMany({where:{players: {some: {}}}, include: {players: true}})
    }
    catch{return undefined;}
  }

  findAll() {
    return this.db.team.findMany({include: {players: true}});
  }

  findOne(id: number) {
    return this.db.team.findFirst({where:{id}, include: {players: true}});
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return this.db.team.update({where:{id}, data: updateTeamDto});
  }

  async remove(id: number) {
    try{
      return await this.db.team.delete({where:{id}});
    }
    catch {return undefined;}
  }
}

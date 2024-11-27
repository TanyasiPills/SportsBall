import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  @Get('players')
  findAllPlayerTeam(){
    return this.teamsService.getAllPlayerTeam();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(+id);
  }


  @Delete(':id/deleteplayer/:playerid')
  deletePlayer(@Param('id') id : string, @Param('playerid') playerid : string){
    return this.teamsService.deletePlayer(+id,+playerid);
  }

  @Post(':id/addPlayer/:playerid')
  addPlayer(@Param('id') id : string, @Param('playerid') playerid : string){
    return this.teamsService.addPlayer(+id,+playerid);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(+id, updateTeamDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const stuff = await this.teamsService.remove(+id);
    if(stuff == undefined) throw new NotFoundException();
    return stuff;
  }

}

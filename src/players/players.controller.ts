import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const stuff = await this.playersService.findOne(+id);
    if(stuff == undefined) throw new NotFoundException();
    return stuff;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    const stuff = await this.playersService.update(+id, updatePlayerDto);
    if(stuff == undefined) throw new NotFoundException();
    return stuff;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const stuff = await this.playersService.remove(+id);
    if(stuff == undefined) throw new NotFoundException();
    return stuff;
  }
}

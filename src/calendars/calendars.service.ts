import { Injectable } from '@nestjs/common';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Calendar } from './entities/calendar.entity';
import { Wedding } from 'src/weddings/entities/wedding.entity';


@Injectable()
export class CalendarsService {
  @InjectRepository(Calendar) private repository: Repository<Calendar>;
  @InjectRepository(Wedding)  weddingRepository: Repository<Wedding>;
 async create(body: CreateCalendarDto) {
    let calendar=new Calendar()
    let wedding= await this.weddingRepository.findOne({ id: body.weddingId })
    calendar.wedding=wedding
   
    return this.repository.save(
      this.repository.create({
        ...calendar, wedding
      }),
    )
  }

  async findAll() {
    return this.repository.find();
    
  }

  findOne(id: number) {
    
    return this.repository.createQueryBuilder("calendar")
    .where("calendar.id = " + id)
    .getOne()
    
  }


  async remove(id: number) {
    let calendar = await this.repository.findOne(id);
    this.repository.remove(calendar);
  }
}

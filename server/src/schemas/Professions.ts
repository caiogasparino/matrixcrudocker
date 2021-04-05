import { ObjectID, Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity('profession')
class Profession {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ type: 'array' })
  profession: string[];

  @Column()
  person_id: string;
}

export default Profession;

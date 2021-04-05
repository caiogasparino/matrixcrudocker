import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('persons')
class Person {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 120 })
  name: string;

  @Column()
  phone_number: string;

  @Column()
  cellphone_number: string;

  @Column()
  cep: string;

  @Column()
  street: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  constructor(props: Omit<Person, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuidv4();
    }
  }
}

export default Person;

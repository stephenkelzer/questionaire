import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import dayjs from "dayjs";

export interface SubmissionCreateRequest {
    fullName: string;
    dob: Date;
    happiness: number;
    energy: number;
    hopefulness: number;
    hoursSleptLastNight: number;
}

@Entity()
export class Submission {
    constructor(data: SubmissionCreateRequest) {
        this.fullName = data.fullName;
        this.dob = data.dob;
        this.age = dayjs().diff(dayjs(data.dob), "year");
        this.happiness = data.happiness;
        this.energy = data.energy;
        this.hopefulness = data.hopefulness;
        this.hoursSleptLastNight = data.hoursSleptLastNight;
    }

    @PrimaryKey()
    id!: number;

    @Property()
    fullName: string;

    @Property()
    dob: Date;

    @Property()
    age: number;

    @Property()
    happiness: number;

    @Property()
    energy: number;

    @Property()
    hopefulness: number;

    @Property()
    hoursSleptLastNight: number;

    @Property()
    createdAt: Date = new Date();
}
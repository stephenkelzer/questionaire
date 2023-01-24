export interface SubmissionCreateRequest {
    fullName: string;
    dob: Date;
    happiness: number;
    energy: number;
    hopefulness: number;
    hoursSleptLastNight: number;
}

export interface Submission {
    id: number;
    fullName: string;
    dob: Date;
    age: number;
    happiness: number;
    energy: number;
    hopefulness: number;
    hoursSleptLastNight: number;
    createdAt: Date;
}
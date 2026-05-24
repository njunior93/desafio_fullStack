import type { ICreateVolunteerInput } from "./ICreateVolunteerInput";

export interface IVolunteer extends ICreateVolunteerInput {
    id: number;
    status: boolean;
    data_inscricao: string;
}
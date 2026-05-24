import type { IVolunteer } from "./IVolunteer";

export interface IVolunteerPageOutput {
    total: number;
    page: number;
    limit: number;
    items: IVolunteer[];
}
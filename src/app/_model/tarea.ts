import { Recinto } from "./recinto";

export class Tarea {
    public id: number;
    public nombre: string;
    public tipo: string;
    public cron: string;
    public body: string;
    public recinto: Recinto;
}
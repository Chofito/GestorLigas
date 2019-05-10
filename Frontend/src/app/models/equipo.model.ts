export class Equipo {
    constructor(
        public _id: string,
        public nombreEquipo: string,
        public golesAFavor: number,
        public golesEnContra: number,
        public diferenciaDeGoles: number,
        public partidosJugados: number,
        public puntos: number,
        public imagen: string,
        public liga: string
    ) { }
}
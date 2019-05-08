export class Equipo {
    constructor(
        public _id: String,
        public nombreEquipo: String,
        public golesAFavor: Number,
        public golesEnContra: Number,
        public diferenciaDeGoles: Number,
        public partidosJugados: Number,
        public puntos: Number,
        public liga: String
    ) { }
}
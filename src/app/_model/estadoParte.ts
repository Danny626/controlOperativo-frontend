export class EstadoParte {
    public nombre: string;
    public descripcion: string;

    constructor({nombre='', descripcion=''} = {}) {
        this.nombre = nombre;
        this.descripcion = descripcion;
    }

    getEstadosEnProcesoParteSuma = () : EstadoParte[] => {
        return [
            new EstadoParte({nombre: 'REGISTRADO', descripcion: 'Registrado'}),
            new EstadoParte({nombre: 'ACEPTADO', descripcion: 'Aceptado'}),
            new EstadoParte({nombre: 'OBSERVADO', descripcion: 'Observado'}),
            new EstadoParte({nombre: 'AGRUPADO', descripcion: 'Agrupado'}),
            new EstadoParte({nombre: 'EN_REVISION', descripcion: 'En Revisión'}),
        ];
    }

    getEstadosConcluidoParteSuma = () : EstadoParte[] => {
        return [
            new EstadoParte({nombre: 'CONCLUIDO', descripcion: 'Concluido'}),
        ];
    }
}
export class ParamsMisPartesSuma {
    public page:   number;
    public size:   number;
    public search: string;
    public tipPre: string[];
    public to:     Date;
    public from:   Date;
    public column: string;

    constructor(page?: number, size?: number, search?: string, tipPre?: string[], to?: Date, from?: Date, column?: string) {
        if(page) {
            this.page = page;
            this.size = size;
            this.search = search;
            this.tipPre = tipPre;
            this.to = to;
            this.from = from;
            this.column = column;
        }
    }

    getParamsMisPartesSuma = (tipoRecinto: string, fechaInicial: Date, fechaFinal: Date, search: string): ParamsMisPartesSuma => {
        const pageValue = 0;
        const sizeValue = 10;
        const tipPreAeropuerto = ['MANIFESTADO', 'NO_MANIFESTADO', 'CUSTODIO', 'CONSOLIDADO', 'COURIER'];
        const tipPreInterior = ['MANIFESTADO', 'NO_MANIFESTADO', 'CUSTODIO', 'CONSOLIDADO'];
        const columnValue = 'cor';

        let tipPre;
        const paramsMisPartesSuma: ParamsMisPartesSuma = new ParamsMisPartesSuma();

        if(tipoRecinto === 'AEROPUERTO') {
            tipPre = tipPreAeropuerto;
        }

        if(tipoRecinto === 'INTERIOR') {
            tipPre = tipPreInterior;
        }

        if(tipoRecinto === 'FRONTERA') {
            tipPre = tipPreInterior;
        }

        paramsMisPartesSuma.page = pageValue;
        paramsMisPartesSuma.size = sizeValue;
        paramsMisPartesSuma.search = search;
        paramsMisPartesSuma.tipPre = tipPre;
        paramsMisPartesSuma.to = fechaFinal;
        paramsMisPartesSuma.from = fechaInicial;
        paramsMisPartesSuma.column = columnValue;

        return paramsMisPartesSuma;
    };
}

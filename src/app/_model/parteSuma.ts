import { Aduana } from "./aduana";
import { DestinatarioParte } from "./destinatarioParte";
import { EstadoParte } from "./estadoParte";
import { Recinto } from "./recinto";
import { TipoCargaParte } from "./tipoCargaParte";
import { UsuarioParte } from "./usuarioParte";

export class ParteSuma {
    public id: number;
    public parteRecepcion: string;
    public gestion: number;
    public aduana: Aduana;
    public nroRegistroParte: String;
    public fechaRecepcion: Date;
    public estadoParte: EstadoParte;
    public nroManifiesto: String;
    public registroManifiesto: String;
    public documentoEmbarque: String;
    public documentoRelacionado: String;
    public placaPatente: String;
    public destinatarioParte: DestinatarioParte;
    public tipoCargaParte: TipoCargaParte;
    public usuarioParte: UsuarioParte;
    public recinto: Recinto;
    public estado: String;
    public fechaRegistro: Date;
}
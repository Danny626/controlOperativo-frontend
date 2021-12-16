import { ParteSuma } from "app/_model/parteSuma";
import { ErrorParte } from "./errorParte.dto";

export interface ResultRegistroPartesSuma {
    totalRegistros:         number;
    registrosGuardados:     number;
    registrosNoGuardados:   number;
    registrosError:         ErrorParte[];
    partesSumaGuardados:    ParteSuma[];
}
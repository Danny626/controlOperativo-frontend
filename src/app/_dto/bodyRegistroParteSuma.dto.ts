import { BodyLoginSuma } from "./bodyLoginSuma.dto";
import { BodyMisPartesSuma } from "./bodyMisPartesSuma.dto";
import { ParamsMisPartesSuma } from "./paramsMisPartesSuma.dto";

export interface BodyRegistroParteSuma {
    usuario:                string;
    token:                  string;
    bodyMisPartesSuma:      BodyMisPartesSuma;
    paramsMisPartesSuma:    ParamsMisPartesSuma;
    bodyLoginSuma:          BodyLoginSuma;
    codRecinto:             string;
}
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BodyRegistroParteSuma } from 'app/_dto/bodyRegistroParteSuma.dto';
import { Recinto } from 'app/_model/recinto';
import { Tarea } from 'app/_model/tarea';
import { RecintoService } from 'app/_service/services';



@Component({
  selector: 'app-tarea-dialog',
  templateUrl: './tarea-dialog.component.html',
  styleUrls: ['./tarea-dialog.component.scss']
})
export class TareaDialogComponent implements OnInit {

  formTarea: FormGroup;
  recintoSelec: Recinto;
  recintos: Recinto[] = []

  tipoSelec: string;

  hide = true;

  bodyRegistroParteSuma: BodyRegistroParteSuma;

  constructor(
    private recintoService: RecintoService,
    public dialogRef: MatDialogRef<TareaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public tarea: Tarea,
  ) {}

  ngOnInit(): void {
    this.listarRecintos();
    this.bodyRegistroParteSuma = JSON.parse(this.tarea.body);

    this.formTarea = new FormGroup({
      'nombre': new FormControl(this.tarea.nombre, [Validators.required]),
      'tipo': new FormControl(this.tarea.tipo, [Validators.required]),
      'cron': new FormControl(this.tarea.cron, [Validators.required]),
      'recinto': new FormControl(this.tarea.recinto.recCod, [Validators.required]),
      'usuarioSuma': new FormControl(this.bodyRegistroParteSuma.bodyLoginSuma.nombreUsuario, [Validators.required]),
      'passwordSuma': new FormControl('')
    });

    this.recintoSelec = this.tarea.recinto;
  }

  onAceptar() {
    this.bodyRegistroParteSuma.bodyLoginSuma = {
      nombreUsuario: this.formTarea.value['usuarioSuma'],
      password: this.formTarea.value['passwordSuma'] === '' ? this.bodyRegistroParteSuma.bodyLoginSuma.password : this.formTarea.value['passwordSuma'],
      tipo: this.bodyRegistroParteSuma.bodyLoginSuma.tipo
    };

    const tareaModificada: Tarea = {
      id: this.tarea.id,
      nombre: this.formTarea.value['nombre'],
      tipo: this.formTarea.value['tipo'],
      cron: this.formTarea.value['cron'],
      body: JSON.stringify(this.bodyRegistroParteSuma),
      recinto: this.recintoSelec
    };

    this.dialogRef.close(tareaModificada)
  }

  onCancel() {
    this.dialogRef.close(null);
  }

  listarRecintos() {
    this.recintoService.listarRecintos()
      .subscribe(recintos => {
        this.recintos = recintos
      });
  }

}

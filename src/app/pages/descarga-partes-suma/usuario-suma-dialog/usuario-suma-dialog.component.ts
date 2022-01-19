import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BodyLoginSuma } from 'app/_dto/bodyLoginSuma.dto';

@Component({
  selector: 'app-usuario-suma-dialog',
  templateUrl: './usuario-suma-dialog.component.html',
  styleUrls: ['./usuario-suma-dialog.component.scss']
})
export class UsuarioSumaDialogComponent implements OnInit {

  formDatosUsuario: FormGroup;
  hide = true;

  constructor(
    public dialogRef: MatDialogRef<UsuarioSumaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public bodyLoginSuma: BodyLoginSuma,
  ) {
    this.formDatosUsuario = new FormGroup({
      'nombreUsuario': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === "Escape") {
          this.onCancelClick();
      }
    });
  }

  onCancelClick() {
    this.dialogRef.close(null);
  }

  onOkClick() {
    this.bodyLoginSuma.nombreUsuario = this.formDatosUsuario.value['nombreUsuario'];
    this.bodyLoginSuma.password = this.formDatosUsuario.value['password'];
    this.bodyLoginSuma.tipo = 'EXTERNO';

    this.dialogRef.close(this.bodyLoginSuma);
  }

}

import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import {ConfirmationService} from 'primeng/api';
import { Mensaje } from 'src/app/models/mensaje';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [ConfirmationService]
})
export class UsuariosComponent implements OnInit {

  
  usuarios: Usuario[] = []
  msj: Mensaje[] = [];
  userSelected: Usuario = {id: "", nombre: "", apellido: "", correo: "", numtelf: "", direccion: "", estaengrupo: false, coordinador: false}
  display: boolean = false;
  


  constructor( public usuarioService: UsuariosService, 
  private confirmationService: ConfirmationService, private db: Firestore, private usuariosService:UsuariosService) 
  {this.usuariosService.getUsuarios().subscribe(data=>this.usuarios=data)}

  ngOnInit(): void {
  }

   confirm(usuario: Usuario) {
     this.display = false
    this.confirmationService.confirm({
        message: 'Seguro que quieres eliminar a este usuario?',
        accept: () => {
          this.msj = [{severity:'error', summary:'Eliminado', detail:'Has eliminado a este usuario'}];
          this.delete(usuario);
          
      },
        reject: () => {
            this.msj = [{severity:'warn', summary:'Cancelado', detail:'No se ha eliminado este usuario'}];
           
      }
    });
  }

  delete(usuario: Usuario){
    this.usuarioService.deleteUsuario(usuario.id)
  }

  showDialog(usuario: Usuario) {
    this.display = true;
    this.userSelected = usuario;
  }

}
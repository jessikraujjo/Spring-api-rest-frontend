import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { User } from 'src/app/model/user';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {

  usuario = new User();

  constructor(private routeActive: ActivatedRoute, private userService: UsuarioService) { }

  ngOnInit() {
    let id = this.routeActive.snapshot.paramMap.get('id');

    if(id != null){
      this.userService.getStudant(id).subscribe(data => {
        this.usuario = data;
        //console.log("dados pego: "+ this.usuario);
        
      });
      
    }
  }
  salvarUser(){
   if(this.usuario.id != null && this.usuario.id.toString().trim != null){ /*att*/
    this.userService.updateUsuario(this.usuario).subscribe(data => {
      this.novo();
      console.info("User atualizado: ", data);
    });
   }else{
     this.userService.salvarUsuario(this.usuario).subscribe (data => { /*add*/
      this.novo();
      console.info("Gravou Use:" + data);
     });
   }
  }

  novo(){
    this.usuario = new User();
  }

}

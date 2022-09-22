import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../servicio/services.service';
import {personajes} from '../Modelo/listado/Listado';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  personajes: personajes[] = [];

  email: string;
  pass:string;

  DataClient: any[] = [];

  constructor(private servicio: ServicesService, private router: Router) {}

  ngOnInit(): void {

      // let infoUser = JSON.parse(localStorage.getItem('MiData'));
 
      // let {user} = infoUser;

      // this.DataClient = Object.values({user});

      // console.log(this.DataClient)

  }

  loguearse(){
   this.servicio.login(this.email, this.pass).then((respuesta)=>{
    console.log(respuesta)
   }).catch((error)=>{
    alert("error de datos" + error)
   })
  }
  loginGoogle(){
    this.servicio.loginGoogle().then((respuesta) =>{
      console.log(respuesta.user.multiFactor)
     var hola = respuesta.user.multiFactor
     localStorage.setItem('MiData', JSON.stringify(hola))

      this.router.navigate(['/principal'])
     
      
    },error=>{console.log(error)})
    

  }

  loginMicrosoft(){
    this.servicio.loginMicrosoft()
    

  }


}

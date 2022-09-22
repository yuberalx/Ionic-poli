import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {


  DataClient: any[] = [];
  constructor() { }

  ngOnInit(): void {

    let infoUser = JSON.parse(localStorage.getItem('MiData'));

    let {user} = infoUser;

    this.DataClient = Object.values({user});

    console.log(this.DataClient)

}
}

import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})



export class DashboardComponent implements OnInit {

  socket: any;
  constructor() { }
  

  ngOnInit(): void {

    


  }

  conect(sala:any): void {

    if(!this.socket)
      this.socket = io("http://localhost:3000");

    console.log(this.socket.id);

    this.socket.emit('connectRoom', {roomName: sala});

    this.socket.on('valueChange', ( message: any ) => {
      
        const element = document.getElementById('info');
        if (element) element.innerHTML = message;

        
    })

    this.socket.removeListener('conectadoSala');
    this.socket.on('conectadoSala', (message: any) =>{
     
      const element = document.getElementById('nSala');
      if (element) element.innerHTML = message;
    })


    this.socket.removeListener('desconectadoSala');
    this.socket.on('desconectadoSala', (message: any)=>{
      
      alert("desconectado de " + message);
      const element = document.getElementById('nSala');
      if (element) element.innerHTML = "";

      
    })

  }

  sendMessage(message: string): void {

      if(!this.socket){
        console.log('deu ruim');
        return;
      }
        

      this.socket.emit('message', message);
  }


  disconect(sala: string): void {
    this.socket.emit('disconnectRoom', {roomName: sala});
  }

}

import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { MatSliderChange } from '@angular/material/slider';


@Component({
  selector: 'app-updater',
  templateUrl: './updater.component.html',
  styleUrls: ['./updater.component.scss']
})
export class UpdaterComponent implements OnInit {

  socket: any;
  continuar = true;
  sala = "";
  constructor() { }

  ngOnInit(): void {
  }


  conectar(sala:any): void{


    if(!this.socket)
      this.socket = io("http://localhost:3000");

    console.log(this.socket.id);
    this.socket.emit('connectRoom', {roomName: sala});

    this.sala = sala;

    this.socket.removeListener('conectadoSala');
    this.socket.on('conectadoSala', (message: any) =>{
      sala = message;
      const element = document.getElementById('nSala');
        if (element) element.innerHTML = message;

    });

    this.socket.removeListener('desconectadoSala');
    this.socket.on('desconectadoSala', (message: any)=>{

      console.log('aaaaaa');
      alert("desconectado de " + message);
      const element = document.getElementById('nSala');
      if (element) element.innerHTML = "";

    })

  }

   async iniciar(): Promise<void> {

    this.continuar = true;
    let atual = 60;

    if(!this.socket){
      alert('Conecte Primeiro');
      return;
    }

    

    while(this.continuar){
      await this.delay(800);
      
      atual = (Math.floor(Math.random() * (200)) + (1));
      
      const element = document.getElementById('valor');
        if (element) element.innerHTML = atual.toString();

        console.log(this.sala);
        this.socket.emit('update', {roomName: this.sala, message: atual});
     
    }


  }

  parar(): void {
    this.continuar = false;
  }


  async delay(valor:number): Promise<void>{

    return new Promise(r => {
      setTimeout(r,valor);
    })
  }

  disconect(sala: string): void {
    this.socket.emit('disconnectRoom', {roomName: sala});
    this.sala = "";
  }


  Slide(event: MatSliderChange, sala: any): void{

    if(!this.socket){
      alert('Conecte Primeiro');
      return;
    }

    this.socket.emit('mSlider', { roomName: sala, message: event.value});

 }

  
}

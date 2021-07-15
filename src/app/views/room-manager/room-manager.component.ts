import { Component, OnInit } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { io } from 'socket.io-client';

interface Sala {
  value: string;
  viewValue: string;

}

@Component({
  selector: 'app-room-manager',
  templateUrl: './room-manager.component.html',
  styleUrls: ['./room-manager.component.scss']
})




export class RoomManagerComponent implements OnInit {

  salaAtual: string;
  socket: any;

  constructor() { 

    this.salaAtual = "";

  }

  ngOnInit(): void {
  }

  
  salas: Sala[] = [
    {value: 'Sala1', viewValue: 'Sala 1'},
    {value: 'Sala2', viewValue: 'Sala 2'},
    {value: 'Sala3', viewValue: 'Sala 3'},
    {value: 'Sala4', viewValue: 'Sala 4'},
  ];
  


  mudarSala(event: any): void{
    

    
      if(!(this.salaAtual == ""))
        this.desconectar(this.salaAtual);

      this.conectar(event.source.value);

      this.salaAtual = event.source.value;

    
  }


  desconectar(sala: string): void{
    this.socket.emit('disconnectRoom', {roomName: sala});
  }


  conectar(sala: string): void {

    this.socket.emit('connectRoom', {roomName: sala});

  }

  conectarWebSocket(): void {

    if(!this.socket){
      this.socket = io("http://localhost:3000");
      alert("Conectado a localhost ");
    }

    this.socket.on('conectadoSala', (message: any) =>{
      
      const element = document.getElementById('nSala');
        if (element) element.innerHTML = message;

    });


   
    this.socket.on('desconectadoSala', (message: any)=>{

      
      const element = document.getElementById('nSala');
      if (element) element.innerHTML = "";

    });


    this.socket.on('updateValueChange', ( message: any ) => {
      
      const element = document.getElementById('infoUpdate');
      if (element) element.innerHTML = message;

      
    });


    this.socket.on('sliderValueChange', ( message: any ) => {
      
      const element = document.getElementById('infoSlider');
      if (element) element.innerHTML = message;

      
    })
      
  }

}


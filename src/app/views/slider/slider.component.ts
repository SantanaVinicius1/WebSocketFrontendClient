import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  socket: any;
  constructor() { }

  ngOnInit(): void {
  }


  Slide(event: MatSliderChange): void{

     if(!this.socket){
       alert('Conecte Primeiro');
       return;
     }

     

     this.socket.emit('mSlider', { roomName: "sala1", message: event.value});

  }


  conectar(): void {

      this.socket = io('http://localhost:3000');

  }

}

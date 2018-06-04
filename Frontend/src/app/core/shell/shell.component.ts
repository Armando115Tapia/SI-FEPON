import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { MessageService } from './../message.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  mensajes: Message[];
  timeout: any;

  constructor(private messageService: MessageService) {
    this.mensajes = [];
  }

  ngOnInit() {
    this.messageService.messageObserver.subscribe(
      (data: Message) => {
        this.mensajes.push(data);
        this.borrarNotificacionTimeout();
      },
      error => {
        console.log(error);
      }
    );
  }

  borrarNotificacionTimeout() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.mensajes = [];
    }, 3000);

  }

}



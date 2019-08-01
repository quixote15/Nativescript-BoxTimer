import { Component, OnInit } from '@angular/core';
import {ModalDialogParams} from 'nativescript-angular/modal-dialog';

@Component({
  selector: 'ns-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private modalParams: ModalDialogParams) { }

  ngOnInit() {

  }

  onHandleInput(action: 'yes' | 'no') {
      this.modalParams.closeCallback(action);
  }


}

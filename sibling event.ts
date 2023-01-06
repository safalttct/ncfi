Here's an example of how you can do this:

Create a shared service that has a subject that you can next to emit an event.
Inject the shared service into the parent component and the sibling component.
In the parent component, call next on the subject to emit the event.
In the sibling component, subscribe to the subject to listen for emitted events.
Here's some code that demonstrates this:

// parent.component.ts

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private eventEmitter = new Subject<any>();

  emit(event: any) {
    this.eventEmitter.next(event);
  }

  get eventObservable() {
    return this.eventEmitter.asObservable();
  }
}

// sibling.component.ts

import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-parent',
  template: `
    <button (click)="emitEvent()">Emit event</button>
    <app-sibling></app-sibling>
  `,
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
  }

  emitEvent() {
    this.sharedService.emit({event: 'event emitted from parent'});
  }
}

// sibling.component.ts

import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-sibling',
  template: `
    <p>Sibling component</p>
  `,
  styleUrls: ['./sibling.component.css']
})
export class SiblingComponent implements OnInit {

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.eventObservable.subscribe(event => {
      console.log(event); // log the emitted event
    });
  }

}




import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages = [
    { title: 'Travel', url: '/travel', icon: 'mail' },
    { title: 'Részletek', url: '/travel-details', icon: 'mail' },

    { title: 'Inbox', url: '/folder/inbox', icon: 'mail' }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}

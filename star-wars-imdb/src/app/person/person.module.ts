import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonComponent } from './person.component';
import { PersonRoutingModule } from './person.routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [PersonComponent],
  imports: [CommonModule, PersonRoutingModule, MatToolbarModule, MatIconModule],
})
export class PersonModule {}

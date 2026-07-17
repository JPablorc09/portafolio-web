import { Component, signal } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  readonly menuOpen = signal(false);

  toggleMenu() {
    this.menuOpen.update((value) => !value);
  }
  closeMenu() {
    this.menuOpen.set(false);
  }
}

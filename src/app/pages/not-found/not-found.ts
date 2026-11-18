import { Component, inject, RESPONSE_INIT } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `<div class="profile-page container">
    <header class="profile-header">
      <span class="section-heading__eyebrow">Error 404</span>
      <h1>Página no encontrada.</h1>
      <p>
        La dirección solicitada no está disponible. Puede consultar los proyectos publicados o
        regresar al inicio.
      </p>
      <div class="profile-actions">
        <a class="button button--primary" routerLink="/proyectos">Consultar proyectos</a
        ><a class="button button--outline" routerLink="/">Volver al inicio</a>
      </div>
    </header>
  </div>`,
})
export class NotFound {
  constructor() {
    const response = inject(RESPONSE_INIT, { optional: true });
    if (response) response.status = 404;
  }
}

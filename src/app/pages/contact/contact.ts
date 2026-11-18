import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { PROFESSIONAL_CONTACT } from '../../data/professional-contact';
import { WEB_PLANS } from '../../data/service-offering';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  readonly contact = PROFESSIONAL_CONTACT;
  private readonly queryParams = toSignal(inject(ActivatedRoute).queryParamMap);
  readonly selectedPlan = computed(() =>
    WEB_PLANS.find((plan) => plan.id === this.queryParams()?.get('plan')),
  );
  readonly quoteMessage = computed(() => {
    const plan = this.selectedPlan();
    return plan
      ? `Hola Juan Pablo. Me interesa consultar el plan ${plan.name}. Me gustaría conversar sobre el alcance y recibir una cotización para mi proyecto.`
      : 'Hola Juan Pablo. Vi su portafolio y me gustaría cotizar un proyecto. Quisiera conversar sobre las necesidades de mi negocio.';
  });
  readonly whatsappUrl = computed(
    () => `${this.contact.whatsapp}?text=${encodeURIComponent(this.quoteMessage())}`,
  );
  readonly quoteEmailUrl = computed(
    () =>
      `mailto:${this.contact.email}?subject=${encodeURIComponent(this.selectedPlan() ? 'Consulta del plan ' + this.selectedPlan()!.name : 'Cotización de proyecto')}&body=${encodeURIComponent(this.quoteMessage())}`,
  );
  readonly employmentEmailUrl = `mailto:${this.contact.email}?subject=${encodeURIComponent('Oportunidad laboral - Juan Pablo Rojas Contreras')}`;
  readonly socialLinks = [
    {
      name: 'LinkedIn',
      description: 'Perfil y trayectoria profesional',
      url: this.contact.linkedin,
    },
    { name: 'GitHub', description: 'Proyectos y repositorios públicos', url: this.contact.github },
  ];
  readonly contributions = [
    {
      title: 'Desarrollo Full Stack',
      description: 'Interfaces Angular y TypeScript, APIs ASP.NET Core y persistencia de datos.',
    },
    {
      title: 'Integración de sistemas',
      description: 'APIs REST, intercambio de información y validaciones entre aplicaciones.',
    },
    {
      title: 'Monitoreo y reportes',
      description:
        'Experiencia con información de PRTG y reportes de fallas mediante integraciones con Aranda ASMS.',
    },
    {
      title: 'Bases de datos',
      description:
        'Modelos relacionales, consultas y persistencia con SQL Server y Entity Framework Core.',
    },
  ];
}

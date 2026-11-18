import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { Contact } from './contact';
import { PROFESSIONAL_CONTACT } from '../../data/professional-contact';

describe('Contact', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: 'contacto', component: Contact }])],
    }),
  );

  it('separates employment from quotations and preserves the real CV and contacts', async () => {
    const harness = await RouterTestingHarness.create();
    const page = await harness.navigateByUrl('/contacto', Contact);
    const element = harness.routeNativeElement!;
    const employment = element.querySelector<HTMLAnchorElement>(
      '#oportunidad-laboral a[href^="mailto:"]',
    )!;
    const quote = element.querySelector<HTMLAnchorElement>('#cotizar a[href^="mailto:"]')!;
    expect(decodeURIComponent(employment.href)).toContain('Oportunidad laboral');
    expect(decodeURIComponent(quote.href)).toContain('Cotización de proyecto');
    expect(employment.href).not.toBe(quote.href);
    expect(element.querySelector<HTMLAnchorElement>('a[download]')?.getAttribute('href')).toBe(
      PROFESSIONAL_CONTACT.cv,
    );
    expect(new URL(page.whatsappUrl()).pathname).toBe('/50662794709');
    expect(element.querySelector('form')).toBeNull();
  });

  it('updates the selected plan and prepared messages on navigation within Contact', async () => {
    const harness = await RouterTestingHarness.create();
    const page = await harness.navigateByUrl('/contacto?plan=profesional', Contact);
    expect(page.selectedPlan()?.name).toBe('Profesional');
    expect(new URL(page.whatsappUrl()).searchParams.get('text')).toContain('plan Profesional');
    expect(decodeURIComponent(page.quoteEmailUrl())).toContain('Consulta del plan Profesional');
    await TestBed.inject(Router).navigateByUrl('/contacto?plan=emprendedor');
    harness.detectChanges();
    expect(page.selectedPlan()?.name).toBe('Emprendedor');
    expect(harness.routeNativeElement!.querySelector('.selected-plan')?.textContent).toContain(
      '₡75.000',
    );
    await TestBed.inject(Router).navigateByUrl('/contacto');
    harness.detectChanges();
    expect(page.selectedPlan()).toBeUndefined();
    expect(harness.routeNativeElement!.querySelector('.selected-plan')).toBeNull();
  });

  it('ignores unrecognized query parameters instead of inserting them in contact messages', async () => {
    const harness = await RouterTestingHarness.create();
    const page = await harness.navigateByUrl(
      '/contacto?plan=%3Cscript%3Ealert(1)%3C/script%3E',
      Contact,
    );
    expect(page.selectedPlan()).toBeUndefined();
    expect(page.quoteMessage()).not.toContain('script');
    expect(decodeURIComponent(page.quoteEmailUrl())).not.toContain('script');
  });

  it('announces and protects all new-tab external links', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/contacto', Contact);
    const links = [
      ...harness.routeNativeElement!.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]'),
    ];
    expect(links.length).toBe(4);
    for (const link of links) {
      expect(link.rel).toContain('noopener');
      expect(link.rel).toContain('noreferrer');
      expect(link.textContent).toContain('abre en otra pestaña');
    }
  });
});

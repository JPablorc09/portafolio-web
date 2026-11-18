import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROJECTS } from '../../data/projects';
import { PROFESSIONAL_CONTACT } from '../../data/professional-contact';
import { PROFESSIONAL_PROFILE } from '../../data/professional-profile';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class Experience {
  readonly engagement = PROFESSIONAL_PROFILE.engagement;
  readonly contact = PROFESSIONAL_CONTACT;
  readonly relatedProjects = PROJECTS.filter(project => project.context === 'institutional');
}

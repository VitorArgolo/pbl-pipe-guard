import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IIncident, fillIncidents } from '../incidents';
import { IncidentsService } from '../incidents.service';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css']
})
export class IncidentsComponent implements OnInit {
  incidents: IIncident[] = [];
  filteredIncidents: IIncident[] = [];
  paginatedIncidents: IIncident[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  filters: { title: string, description: string } = { title: '', description: '' };

  constructor(
    private incidentsService: IncidentsService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    try {
      this.incidents = await fillIncidents();
      this.route.queryParamMap.subscribe(params => {
        const title = params.get("title")?.toLowerCase();
        if (title) {
          this.filters.title = title;
        }
        this.applyFilters();
      });
    } catch (error) {
      console.error('Erro ao preencher incidentes:', error);
    }
  }

  applyFilters() {
    this.filteredIncidents = this.incidents.filter(incident =>
      incident.title.toLowerCase().includes(this.filters.title.toLowerCase()) &&
      incident.description.toLowerCase().includes(this.filters.description.toLowerCase())
    );
    this.paginateIncidents();
  }

  paginateIncidents() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedIncidents = this.filteredIncidents.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.paginateIncidents();
  }

  getHeaderColor(severity: string): string {
    switch (severity) {
      case 'Baixo':
        return '#3e6b36';
      case 'Médio':
        return '#d9a602';
      case 'Alto':
        return '#ff8c00';
      case 'Crítico':
        return '#ff3333';
      default:
        return '#1b4f7f';
    }
  }

  getTextColor(severity: string): string {
    return '#fff'; // Branco por padrão
  }

  getBorderColor(severity: string): string {
    return this.getHeaderColor(severity);
  }
}

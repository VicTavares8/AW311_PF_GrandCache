import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Api } from '../../services/api';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartType, ChartOptions } from 'chart.js';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})

export class Dashboard {
  private api = inject(Api);

  kpis = signal<any>({});
  movimientos = signal<any[]>([]);
  cargando = signal<boolean>(true);

  //gráfica de dona
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }]
  };
  public doughnutChartType: ChartType = 'doughnut';

  //estilización de la gráfica
  public chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    }
  };

  ngOnInit(): void {
    this.cargarDatos();
  }

  //GET
  cargarDatos() {
    this.cargando.set(true);
    this.api.get('dashboard/resumen').subscribe({
      next: (data) => {
        this.kpis.set(data.kpis);
        this.movimientos.set(data.movimientos);

        const labels = data.grafica.map((item: any) => item.categoria);
        const values = data.grafica.map((item: any) => item.cantidad);

        const colors = ['#0d6efd', '#198754', '#0dcaf0', '#20c997', '#6f42c1'];

        this.doughnutChartData = {
          labels: labels,
          datasets: [{
            data: values,
            backgroundColor: colors,
            hoverOffset: 4
          }]
        };

        this.cargando.set(false);
      },
      error: (err) => {
        console.error(err);
        this.cargando.set(false);
      }
    });
  }
}

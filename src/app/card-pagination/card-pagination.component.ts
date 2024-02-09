import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-pagination',
  templateUrl: './card-pagination.component.html',
  styleUrls: ['./card-pagination.component.css']
})
export class CardPaginationComponent implements OnInit {

  data = [
    { id: 1, title: 'Card 1', content: 'Content 1' },
    { id: 2, title: 'Card 2', content: 'Content 2' },
    { id: 2, title: 'Card 2', content: 'Content 2' },
    { id: 2, title: 'Card 2', content: 'Content 2' },
    { id: 2, title: 'Card 2', content: 'Content 2' },
    // ... Ajoutez plus d'éléments selon vos besoins
  ];

  itemsPerPage = 4;
  currentPage = 1;

  get totalPages() {
    return Math.ceil(this.data.length / this.itemsPerPage);
  }

  get visibleData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.data.slice(startIndex, endIndex);
  }

  ngOnInit() {
    // Vous pouvez effectuer d'autres initialisations ici
  }

  totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}



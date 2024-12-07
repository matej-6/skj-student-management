import {AfterViewInit, Component, computed, inject} from '@angular/core';
import {StudentService} from '../student.service';
import {FormsModule} from '@angular/forms';
import {Filter} from '../student.type';

@Component({
  selector: 'app-student-filters',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './student-filters.component.html',
  styleUrl: './student-filters.component.css',

})
export class StudentFiltersComponent implements AfterViewInit{

  private studentService = inject(StudentService)

  filters = StudentService.DostupneFiltre.map((filter, index) => {
    return {
      filter, index
    }
  });


  activeFilter = this.studentService.selectedFilter

  search = "";


  pocet_vysledkov = computed(() => {
    return this.studentService.filteredStudents().length
  })

  selectFilter(f: Filter) {
    this.studentService.selectFilter(f)
  }

  zrusitVyladavanie() {
    this.search = "";
    this.updateSearch()
  }

  updateSearch() {
    this.studentService.updateSearchVal(this.search)
  }

  ngAfterViewInit(): void {
    this.activeFilter = this.studentService.selectedFilter
    this.zrusitVyladavanie()
  }

}

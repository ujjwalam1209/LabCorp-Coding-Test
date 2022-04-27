import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FILTER_MODES } from './todos/constants/filter-modes';
import { ITodo } from './todos/interfaces';
import { addTodo, changeFilterMode, clearCompleted } from './todos/state/todo.actions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  addItem: string = '';
  selectedMode = 'All';
  sub: Subscription;
  data: any = [];
  remainingCount: number = 0;
  totalCount: number = 0;
  currentEditing: number = null;

  constructor(private store: Store<any>) {}

  parseData(data: ITodo[], mode: string) {
    if(mode === 'All') {
      return data
    }

    return data.filter(item => item.completed === (mode === 'Completed'));
  }

  ngOnInit(): void {
    this.sub = this.store.subscribe(res => {
      this.currentEditing = res.todos.editing;
      const data = res.todos.todos;
      this.totalCount = data.length;
      this.remainingCount = this.parseData(data, 'Active').length;
      this.data = this.parseData(data, res.todos.filterMode);
    })
  }

  updateData() {
    if(this.addItem)
      this.store.dispatch(addTodo({
        text: this.addItem
      }));
      this.addItem = '';
  }

  updateFilter(val: FILTER_MODES) {
    this.selectedMode = val;
    this.store.dispatch(changeFilterMode({
      mode: val
    }))
  }

  removeCompleted() {
    this.store.dispatch(clearCompleted())
  }
}

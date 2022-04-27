import { Component, HostListener, Input, OnInit } from '@angular/core';
import { editTodo, removeTodo, toggleCompleted, updateTodo } from '@app/todos/state/todo.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-todos-list',
  styleUrls: [
    './todo-list.component.scss',
  ],
  templateUrl: './todo-list.component.html',
})
export class TodosListComponent implements OnInit {
  @Input() data: any;
  @Input() currentEditing: number;
  currentEditText: string | undefined;

  constructor(private store: Store<any>) {}


  ngOnInit(): void { 
  }

  removeItem(i: number) {
    this.store.dispatch(removeTodo({
      index: i
    }))
  }

  updateCompleted(i: number) {
    this.store.dispatch(toggleCompleted({
      index: i
    }))
  }

  updateEditing(i: number) {
    this.store.dispatch(editTodo({
      index: i
    }))
    this.currentEditText = (this.data[i] || {}).text;
  }

  updateValue(i: number) {
    this.store.dispatch(updateTodo({
      index: i,
      text: this.currentEditText
    }))
    this.updateEditing(null);
  }

  endFocus(args) {
    args.selectionStart=args.selectionEnd = args.target.value.length;
  }
}

import { Component, DestroyRef, forwardRef, inject, input, output } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../tasks';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type WithNull<T extends Record<string, any>> = {
  [KEY in keyof T]: T[KEY] | null;
}

export type TaskWithoutId = Partial<WithNull<Omit<Task, 'id'>>>

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
      <form class="container" [formGroup]="taskForm">
        <input
          tabindex="1"
          type="text" 
          class="task-input" 
          placeholder="Название задачи" 
          formControlName="name"
          [readOnly]="readonly()"
          style="cursor: {{readonly()?'pointer':'text'}};"
        />
        @if(!taskForm.get("name")?.valid && taskForm.get("name")?.dirty){
          <div 
            style="color: red; width:100%; justify-content:start; display:flex; font-size:small"
          >
            Поле не должно быть пустым
          </div>
        }
        <textarea
          tabindex="2"
          type="text"
          class="task-input-description" 
          placeholder="Описание задачи"
          formControlName="description"
          [readOnly]="readonly()"
          style="cursor: {{readonly()?'pointer':'text'}}; resize:{{readonly()?'none':'vertical'}}"
        ></textarea>
      </form>
  `,
  styleUrl: `./task.form.component.scss`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TaskFormComponent),
      multi: true,
    },
  ]

})

export class TaskFormComponent implements ControlValueAccessor{
  taskForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('')
  })
  public readonly = input<boolean>(false)
  private onChanges!: (value: TaskWithoutId) => void;
  private onTouches!: () => void

  private destroyRef = inject(DestroyRef)

  constructor(){
    this.taskForm.valueChanges
    .pipe(
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe((val)=> {
      this.onChanges(val);
    })
  }
  
  writeValue(outsideValue: any): void {
    console.log(outsideValue)
    if (!outsideValue){
      this.taskForm.setValue({name: '', description:''}, { emitEvent: false })
    }
    else this.taskForm.setValue(outsideValue, { emitEvent: false })
    //проверка на null\undefined
  }
  registerOnChange(fn: (value: TaskWithoutId) => void): void {
    console.log("changed")
    this.onChanges = (value: TaskWithoutId) => {
      fn(structuredClone(value));
    }
  }
  registerOnTouched(fn: () => void): void {
    console.log("touched")
    this.onTouches = () => {
      fn()
    }
  }
  setDisabledState?(isDisabled: boolean): void {
    // isDisabled? this.taskForm.disable({ emitEvent: false }) : this.taskForm.enable({ emitEvent: false });
    this.taskForm[isDisabled ? 'disable' : 'enable']({ emitEvent: false });
  }
}

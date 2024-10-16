import { Component, forwardRef, input, output } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
      <form class="container" [formGroup]="taskForm" (ngSubmit)="onSubmit()">
        <input 
          type="text" 
          class="task-input" 
          placeholder="Название задачи" 
          formControlName="name"
        />
        @if(!taskForm.get("name")?.valid && taskForm.get("name")?.dirty){
          <div 
            style="color: red; width:100%; justify-content:start; display:flex; font-size:small"
          >
            Поле не должно быть пустым
          </div>
        }
        <textarea
          type="text"
          class="task-input-description" 
          placeholder="Описание задачи"
          formControlName="description"
        ></textarea>
        @if(!taskForm.disabled && type() === "add"){
          <button class="add-button" type="button" (click)="onSubmit()">Добавить</button>
        } @else if (!taskForm.disabled && type() === "edit"){
          <div class="button-container">
            <button class="add-button" type="button" disabled="!taskForm.valid" (click)="onSubmit()">Сохранить</button>
            <button class="remove-button" type="button"  (click)="onRemove()">Удалить</button>
          </div>
        }
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
  public save = output<FormGroup>()
  public remove = output<FormGroup>()
  public type = input.required<string>()
  constructor(){
    this.taskForm.valueChanges.subscribe((val)=>{console.log(val)})
  }
  
  writeValue(outsideValue: any): void {
    console.log(outsideValue)
    this.taskForm.setValue(outsideValue)
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled? this.taskForm.disable() : this.taskForm.enable()
  }
  onSubmit(){
    console.log(this.taskForm.value)
    this.save.emit(this.taskForm)
    this.taskForm.markAsUntouched()
  }
  onRemove(){
    this.remove.emit(this.taskForm)
  }
}

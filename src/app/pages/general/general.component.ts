import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrl: './general.component.scss'
})
export class GeneralComponent {
  rfContact: any;
  constructor(private fb:FormBuilder) { }
  ngOnInit(): void {
    this.rfContact = this.fb.group({
      name: ['',Validators.required],
      count: ['',Validators.required],
      action: ['',Validators.required],
    })
  }
  onAdd(){
    if(this.rfContact.invalid){
      console.log("loi")
    }else{
      console.log("ok")
    }
  }
}

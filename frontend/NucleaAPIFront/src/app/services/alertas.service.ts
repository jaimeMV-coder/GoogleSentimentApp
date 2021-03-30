import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class AlertasService {

  constructor(private toastr: ToastrService) { }


  showSuccess(text: string | undefined,title: string | undefined) {
    this.toastr.success(text, title);
  }
  showError(text: string | undefined,title: string | undefined) {
    this.toastr.error(text, title);
  }
}

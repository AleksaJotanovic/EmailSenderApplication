import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  @ViewChild('content', { static: false }) accounting!: ElementRef;

  name: string = '';
  email: string = '';
  message: string = '';
  price: number = 0;
  quantity: number = 0;
  date: Date = new Date();

  constructor(private emailService: EmailService) { }

  ngOnInit(): void { }


  // Functionalities
  onSubmit() {
    this.emailService.sendEmail(this.name, this.email, this.message, this.price, this.quantity, this.date).subscribe({
      next: () => console.log('successfully!'),
      error: (err) => console.log('Error while sending email: ', err),
      complete: () => console.log('Email sending completed.')
    });
  }

  // generatePdf() {
  //   let pdf = new jsPDF('p', 'pt', 'a4');
  //   pdf.html(this.content.nativeElement, {
  //     callback: (doc: jsPDF) => {
  //       // doc.save('firstever.pdf');

  //       // var string = doc.output('datauristring');
  //       // var embed = `<embed width='100%' height='100%' src="${string}"/>`
  //       // var x = window.open();
  //       // x?.document.open();
  //       // x?.document.write(embed);
  //       // x?.document.close();
  //       this.emailService.sendEmail(this.name, this.email, this.message, doc);
  //     }
  //   });
  // }

}

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'sign-up-form',
    templateUrl: './sign-up-form.component.html',
    styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {

    sign_up_text: string;
    comp_ph: string;
    fio_ph: string;
    mail_ph: string;
    pcc: Object;
    user_type: [any];
    comment_ph: string;

    reset_btn: string;
    submit_btn: string;

    sin_link: string;


    constructor() {
        this.sign_up_text = "Заявка на регистрацию";
        this.comp_ph = 'Компания';
        this.fio_ph = 'ФИО';
        this.mail_ph = 'E-mail';
        this.pcc = {
            "ua" : "+380"
        };
        this.user_type = [
            { type: "Перевозчик", value: '1' },
            { type: "Заказчик", value: '2' }
        ];
        this.comment_ph = 'Комментарий';
        this.reset_btn = 'Отменить';
        this.submit_btn = 'Отправить';
        this.sin_link = '/signin'
    }

    ngOnInit() {

    }

}

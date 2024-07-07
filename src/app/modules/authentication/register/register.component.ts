/**
 * @module
 */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from '../../../services/account.service';
import { first } from 'rxjs';
import { FieldValidationServices } from '../../../services/fieldsvalidation.services';

interface FormModel {
  userName: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatIconModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  faArrowRight = faArrowRight;

  termsAccepted: boolean = false;
  asyncValidator: any | string;

  form!: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private fieldsValidation: FieldValidationServices,
    // private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(6), [this.asyncValidator]],
      termsAccepted: [false, Validators.requiredTrue]

    });
  }

  /**
   * obtener validadores
   * @returns {[K in keyof FormModel]: AbstractControl}
   */
  get fieldsValidator(): { [K in keyof FormModel]: AbstractControl } {
    return this.form.controls as { [K in keyof FormModel]: AbstractControl };
  }

  /**
  * @returns {AbstractControl}
   */
  get f() {
    return this.form.controls;

  }

  /**
   * envio de formulario
   */
  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return console.log("Eror: no se envio el formulario");
    }

    if (this.form.get('termsAccepted')?.value) {
      console.log("Acepto los terminao");
    } else {
      console.log("no se acepto los termino")
    }

    this.loading = true;

    // this.alertService.clear();

    if (this.form.invalid) {
      return console.log("Eror: no se envio el formulario");
    }

    this.loading = true;

    import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
const usersKey = 'angular-14-registration-login-example-users';
let users: any[] = JSON.parse(localStorage.getItem(usersKey)!) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return handleRoute();

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                case url.match(/\/users\/\d+$/) && method === 'PUT':
                    return updateUser();
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                ...basicDetails(user),
                token: 'fake-jwt-token'
            })
        }

        function register() {
            const user = body

            if (users.find(x => x.username === user.username)) {
                return error('Username "' + user.username + '" is already taken')
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem(usersKey, JSON.stringify(users));
            return ok();
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users.map(x => basicDetails(x)));
        }

        function getUserById() {
            if (!isLoggedIn()) return unauthorized();

            const user = users.find(x => x.id === idFromUrl());
            return ok(basicDetails(user));
        }

        function updateUser() {
            if (!isLoggedIn()) return unauthorized();

            let params = body;
            let user = users.find(x => x.id === idFromUrl());

            // only update password if entered
            if (!params.password) {
                delete params.password;
            }

            // update and save user
            Object.assign(user, params);
            localStorage.setItem(usersKey, JSON.stringify(users));

            return ok();
        }

        function deleteUser() {
            if (!isLoggedIn()) return unauthorized();

            users = users.filter(x => x.id !== idFromUrl());
            localStorage.setItem(usersKey, JSON.stringify(users));
            return ok();
        }

        // helper functions

        function ok(body?: any) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500)); // delay observable to simulate server api call
        }

        function error(message: string) {
            return throwError(() => ({ error: { message } }))
                .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
        }

        function unauthorized() {
            return throwError(() => ({ status: 401, error: { message: 'Unauthorized' } }))
                .pipe(materialize(), delay(500), dematerialize());
        }

        function basicDetails(user: any) {
            const { id, username, firstName, lastName } = user;
            return { id, username, firstName, lastName };
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};

  /**
  * Validar campos
   * @param controlName - nombre del campo
   * @returns {string} - placeholder
  * @returns {string} - mensaje de error
   * @returns
   */
  getPlaceholder(controlName: string): string {
    if (this.submitted && this.f[controlName].errors) {
      if (this.f[controlName].hasError('required')) {
        switch (controlName) {
          case 'userName':
            return 'Usuario es obligatorio';
          case 'email':
            return 'Email es obligatorio';
          case 'password':
            return 'Contraseña es obligatorio';
          default:
            return `Ingresar ${controlName}`;
        }
      }

      if (controlName === 'email' && !this.fieldsValidation.validateEmail(this.f[controlName].value)) {
        return 'Email no es válido';
      }
      if (controlName === 'password' && this.f[controlName].hasError('minlength')) {
        return 'La contraseña debe tener al menos 6 caracteres';
      }
    }
    return controlName.charAt(0).toUpperCase() + controlName.slice(1); // Capitaliza el nombre del campo
  }

  termsAcceptedChecked(): boolean {
    return this.form.get('termsAccepted')?.value === true;
  }

  /**
  * Obtener clases dinamicas
   * @param controlName - nombre del campo
   * @returns
   */
  getClasses(controlName: string) {
    return this.fieldsValidation.getValidationClassName(this.form, controlName, this.submitted);
  };


}



import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetModule } from './widget/widget.module';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { InputTextComponent } from './components/template/input-text/input-text.component';
import { InputPasswordComponent } from './components/template/input-password/input-password.component';
import { OnlyNumberDirective } from './directives/only-number.directive';
import { OnlyDecimalNumberDirective } from './directives/only-decimal-number.directive';
import { PagetitleComponent } from './components/pagetitle/pagetitle.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { SelectCustomComponent } from './components/select-custom/select-custom.component';
import { MensajeVacioComponent } from './components/mensaje-vacio/mensaje-vacio.component';
import { SelectCustomTemplateComponent } from './components/select-custom-template/select-custom-template.component';

export function playerFactory() {
  return player;
}


@NgModule({
  declarations: [
    InputTextComponent,
    InputPasswordComponent,
    OnlyNumberDirective,
    OnlyDecimalNumberDirective,
    PagetitleComponent,
    BreadcrumbComponent,
    MainContainerComponent,
    LoadingComponent,
    ErrorPageComponent,
    SelectCustomComponent,
    SelectCustomTemplateComponent,
    MensajeVacioComponent
  ],
  imports: [
    CommonModule,
    WidgetModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    LottieModule.forRoot({ player: playerFactory }),
    NgSelectModule
  ],
  exports: [
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    LottieModule,
    InputTextComponent,
    InputPasswordComponent,
    PagetitleComponent,
    BreadcrumbComponent,
    MainContainerComponent,
    LoadingComponent,
    ErrorPageComponent,
    SelectCustomComponent,
    MensajeVacioComponent,
    NgSelectModule,
    SelectCustomTemplateComponent
  ]
})

export class SharedModule { }
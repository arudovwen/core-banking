/** Angular Imports */
import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

/** rxjs Imports */
import { merge } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';

/** Translation Imports */
import { TranslateService } from '@ngx-translate/core';

/** Environment Configuration */
import { environment } from 'environments/environment';

/** Custom Services */
import { Logger } from './core/logger/logger.service';
import { ThemeStorageService } from './shared/theme-picker/theme-storage.service';
import { AlertService } from './core/alert/alert.service';
import { AuthenticationService } from './core/authentication/authentication.service';
import { SettingsService } from './settings/settings.service';

/** Custom Items */
import { Alert } from './core/alert/alert.model';
import { KeyboardShortcutsConfiguration } from './keyboards-shortcut-config';
import { Dates } from './core/utils/dates';
import { animate, style, transition, trigger } from '@angular/animations';

/** Initialize Logger */
const log = new Logger('MifosX');

/**
 * Main web app component.
 */
@Component({
  selector: 'mifosx-web-app',
  templateUrl: './web-app.component.html',
  styleUrls: ['./web-app.component.scss'],
  animations: [
    trigger('opacityScale', [
      transition(':enter', [
          style({ opacity: 0, transform: 'scale(.95)' }),
          animate('100ms ease-out', style({  opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
          style({ opacity: 1, transform: 'scale(1)' }),
          animate('75ms ease-in', style({ opacity: 0, transform: 'scale(.95)' }))
      ])
    ])
  ]
})
export class WebAppComponent implements OnInit {

  buttonConfig: KeyboardShortcutsConfiguration;

  /**
   * @param {Router} router Router for navigation.
   * @param {ActivatedRoute} activatedRoute Activated Route.
   * @param {Title} titleService Title Service.
   * @param {TranslateService} translateService Translate Service.
   * @param {ThemeStorageService} themeStorageService Theme Storage Service.
   * @param {MatSnackBar} snackBar Material Snackbar for notifications.
   * @param {AlertService} alertService Alert Service.
   * @param {SettingsService} settingsService Settings Service.
   * @param {AuthenticationService} authenticationService Authentication service.
   * @param {Dates} dateUtils Dates service.
   */
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private titleService: Title,
              private translateService: TranslateService,
              private themeStorageService: ThemeStorageService,
              public snackBar: MatSnackBar,
              private alertService: AlertService,
              private settingsService: SettingsService,
              private authenticationService: AuthenticationService,
              private dateUtils: Dates) { }

  /**
   * Initial Setup:
   *
   * 1) Logger
   *
   * 2) Language and Translations
   *
   * 3) Page Title
   *
   * 4) Theme
   *
   * 5) Alerts
   */
  ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }
    log.debug('init');

    // Setup translations
    this.translateService.addLangs(environment.supportedLanguages.split(','));
    this.translateService.use(environment.defaultLanguage);

    // Change page title on navigation or language change, based on route data
    const onNavigationEnd = this.router.events.pipe(filter(event => event instanceof NavigationEnd));
    merge(this.translateService.onLangChange, onNavigationEnd)
      .pipe(
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data)
      )
      .subscribe(event => {
        const title = event['title'];
        if (title) {
          this.titleService.setTitle(`${this.translateService.instant(title)} | Bancro`);
        }
      });

    // Stores top 100 user activites as local storage object.
    let activities: string[] = [];
    if (localStorage.getItem('mifosXLocation')) {
      const activitiesArray: string[] = JSON.parse(localStorage.getItem('mifosXLocation'));
      const length = activitiesArray.length;
      activities = length > 100 ? activitiesArray.slice(length - 100) : activitiesArray;
    }
    // Store route URLs array in local storage on navigation end.
    onNavigationEnd.subscribe(() => {
      activities.push(this.router.url);
      localStorage.setItem('mifosXLocation', JSON.stringify(activities));
    });

    // Setup theme
    const theme = this.themeStorageService.getTheme();
    if (theme) {
      this.themeStorageService.installTheme(theme);
    }

    // Setup alerts
    this.alertService.alertEvent.subscribe((alertEvent: Alert) => {
      this.snackBar.open(`${alertEvent.message}`, 'Close', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    });
    this.buttonConfig = new KeyboardShortcutsConfiguration();

    // initialize language and date format if they are null.
    if (!localStorage.getItem('mifosXLanguage')) {
      this.settingsService.setDefaultLanguage();
    }
    if (!localStorage.getItem('mifosXDateFormat')) {
      this.settingsService.setDateFormat('dd MMMM yyyy');
    }
    // Set default max date picker as Today
    this.settingsService.setBusinessDate(this.dateUtils.formatDate(new Date(), SettingsService.businessDateFormat));
    // Set the server list from the env var FINERACT_API_URLS
    this.settingsService.setServers(environment.baseApiUrls.split(','));
    // Set the Tenant Identifier(s) list from the env var
    this.settingsService.setTenantIdentifier(environment.fineractPlatformTenantId || 'default');
    this.settingsService.setTenantIdentifiers(environment.fineractPlatformTenantIds.split(','));
  }

  logout() {
    this.authenticationService.logout()
      .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  help() {
    window.open('https://mifosforge.jira.com/wiki/spaces/docs/pages/52035622/User+Manual', '_blank');
  }

  // Monitor all keyboard events and excute keyboard shortcuts
  @HostListener('window:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    const routeD = this.buttonConfig.buttonCombinations.find(x => (x.ctrlKey === event.ctrlKey && x.shiftKey === event.shiftKey && x.altKey === event.altKey && x.key === event.key));
    if (!(routeD === undefined)) {
      switch (routeD.id) {
        case 'logout':
          this.logout();
          break;
        case 'help':
          this.help();
          break;
        case 'runReport':
          document.getElementById('runReport').click();
          break;
        case 'cancel':
          const cancelButtons = document.querySelectorAll('button');
          const filteredcancelButtons = Array.prototype.filter.call(cancelButtons, function (el: any) {
            return el.textContent.trim() === 'Cancel';
          });
          if (filteredcancelButtons.length > 0) {
            filteredcancelButtons[0].click();
          }
          break;
        case 'submit':
          const submitButton = document.querySelectorAll('button');
          const filteredSubmitButton = Array.prototype.filter.call(submitButton, function (el: any) {
            return el.textContent.trim() === 'Submit';
          });
          if (filteredSubmitButton.length > 0) {
            filteredSubmitButton[0].click();
          }
          break;
        default:
          this.router.navigate([routeD.route], { relativeTo: this.activatedRoute });
      }
    }
  }

}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, UrlSegment, NavigationEnd } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BreadcrumbComponent implements OnInit  {
  title = ""

  breadCrumbItems = []
  //public settings: Settings;
  public pageTitle: string;
  public breadcrumbs: {
    name: string;
    url: string
  }[] = [];

  constructor(
              // public appSettings: AppSettings,
              public activatedRoute: ActivatedRoute,
              public router: Router,
              public titleService: Title) {

    // this.settings = this.appSettings.settings;
    console.log('breadcumb');
    this.router.events.subscribe(event => {
     // console.log('event router', event);
      if (event instanceof NavigationEnd) {
        this.breadcrumbs = [];
        this.parseRoute(this.router.routerState.snapshot.root);
        this.pageTitle = "";
        this.breadcrumbs.forEach(breadcrumb => {
          this.pageTitle += ' > ' + breadcrumb.name;
        })
        this.titleService.setTitle("POA - GAD" + this.pageTitle);
      }
    })
  }


  ngOnInit(): void {
    // this.breadCrumbItems = [{ label: 'Forms' }, { label: 'Advanced', active: true }];
  }

  parseRoute(node: ActivatedRouteSnapshot) {
    // console.log('parseRoute', node);
    if (node.data['breadcrumb']) {
      if (node.url.length) {
        let urlSegments: UrlSegment[] = [];
        node.pathFromRoot.forEach(routerState => {
          urlSegments = urlSegments.concat(routerState.url);
        });
        let url = urlSegments.map(urlSegment => {
          return urlSegment.path;
        }).join('/');
        this.breadcrumbs.push({
          name: node.data['breadcrumb'],
          url: '/' + url
        })
      }
    }
    if (node.firstChild) {
      this.parseRoute(node.firstChild);
    }
  }

  public closeSubMenus() {
    let menu = document.querySelector("#menu0");
    if (menu) {
      for (let i = 0; i < menu.children.length; i++) {
        let child = menu.children[i].children[1];
        if (child) {
          if (child.classList.contains('show')) {
            child.classList.remove('show');
            menu.children[i].children[0].classList.add('collapsed');
          }
        }
      }
    }
  }
}









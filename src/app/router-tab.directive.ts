import { Directive, Input } from '@angular/core';
import { TabDirective } from 'ngx-bootstrap/tabs';
import { StateService } from '@uirouter/angular';
import { takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Directive({
  selector: '[routerTab]',
})
export class RouterTabDirective {
  @Input()
  routerTab: string;

  private ngUnsubscribe$ = new Subject<void>();

  constructor(private tab: TabDirective, private $state: StateService) {}

  ngOnInit() {
    this.tab.selectTab
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        filter((t) => t === this.tab)
      )
      .subscribe((t) => {
        this.$state.go(
          '.',
          {
            ...this.$state.$current.params,
            tab: this.routerTab,
          },
          { reload: false }
        );
      });

    if (this.$state.params.tab === this.routerTab) {
      this.tab.active = true;
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}

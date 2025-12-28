import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { AdminService } from '../services/admin.service';
import { getStatistics, getStatisticsSuccess, getStatisticsFailure } from '../actions';
import { StatisticsAppDto } from '../Models/statistics-app.dto';

@Injectable()
export class AdminEffects {
    getStatistics$ = createEffect(() =>
        this.actions$.pipe(
        ofType(getStatistics),
        switchMap(() =>
            this.adminService.getStatistics().pipe(
            map((statistics: StatisticsAppDto) => getStatisticsSuccess({ statistics })),
            catchError(error => of(getStatisticsFailure({ payload: error })))
            )
        )
        )
    ); 
    constructor(
        private actions$: Actions, 
        private adminService: AdminService
    ) {}
}
import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { StatisticsAppDto } from '../Models/statistics-app.dto';

// Get Global App Statistics
export const getStatistics = createAction(
  '[Admin] Get Statistics'
);

export const getStatisticsSuccess = createAction(
  '[Admin] Get Statistics Success',
  props<{ statistics: StatisticsAppDto }>()
);

export const getStatisticsFailure = createAction(
  '[Admin] Get Statistics Failure',
  props<{ payload: HttpErrorResponse }>()
);
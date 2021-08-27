import { Timesheet } from './timesheet.model';

export class TimesheetService {
  availableTimesheets: Timesheet[] = [
    { id: '1', date: '23/08/21', startTime: '08:00', taskDescription: 'Connect Testing', endTime: '17:00', day: 'monday', hoursWorked: 8},
    { id: '2', date: '24/08/21', startTime: '08:00', taskDescription: 'Connect Testing', endTime: '17:00', day: 'tuesday', hoursWorked: 8},
    { id: '3', date: '25/08/21', startTime: '08:00', taskDescription: 'Connect Testing', endTime: '17:00', day: 'wednesday', hoursWorked: 8},
    { id: '4', date: '26/08/21', startTime: '08:00', taskDescription: 'Connect Testing', endTime: '17:00', day: 'thursday', hoursWorked: 8},
    { id: '5', date: '27/08/21', startTime: '08:00', taskDescription: 'Connect Testing', endTime: '17:00', day: 'friday', hoursWorked: 8},
  ];
  timesheets: Timesheet[] = [];

  getSavedRecords() {
    return this.timesheets.slice();
  }
}

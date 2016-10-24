export const ScheduleRecurence = {
  HOURLY: 0,
  DAILY: 1,
  WEEKLY: 2,
};

export const SchedulePeriods = [
  {name: 'every hour', value: ScheduleRecurence.HOURLY},
  {name: 'every day', value: ScheduleRecurence.DAILY},
  {name: 'every week', value: ScheduleRecurence.WEEKLY},
];

export const Weekdays = [
  {key: 0, name: 'Sunday'},
  {key: 1, name: 'Monday'},
  {key: 2, name: 'Tuesday'},
  {key: 3, name: 'Wednesday'},
  {key: 4, name: 'Thursday'},
  {key: 5, name: 'Friday'},
  {key: 6, name: 'Saturday'},
];

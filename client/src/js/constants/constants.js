export const ScheduleRecurence = {
  ONCE:     0,
  HOURLY:   60 * 60 * 1000,
  DAILY:    60 * 60 * 1000 * 24,
  WEEKLY:   60 * 60 * 1000 * 24 * 7,
  MONTHLY:  60 * 60 * 1000 * 24 * 7 * 30
};

export const SchedulePeriods = [
  {name: 'once', value: ScheduleRecurence.ONCE},
  {name: 'every hour', value: ScheduleRecurence.HOURLY},
  {name: 'every day', value: ScheduleRecurence.DAILY},
  {name: 'every week', value: ScheduleRecurence.WEEKLY},
  {name: 'every 30 days', value: ScheduleRecurence.MONTHLY}
];

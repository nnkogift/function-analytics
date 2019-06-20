export class CalendarDate {
  constructor(calendar, year, month, day) {
    this._calendar = calendar;
    this._year = year;
    this._month = month;
    this._day = day;

    if (
      this._calendar._validateLevel === 0 &&
      !this._calendar.isValid(this._year, this._month, this._day)
    ) {
      throw this._calendar.invalids.invalidDate.replace(
        /\{0\}/,
        this._calendar.name
      );
    }
  }

  newDate(a, b, c) {
    return this._calendar.newDate(a == null ? this : a, b, c);
  }

  year(year) {
    return arguments.length === 0 ? this._year : this.set(year, 'y');
  }

  month(month) {
    return arguments.length === 0 ? this._month : this.set(month, 'm');
  }

  day(day) {
    return arguments.length === 0 ? this._day : this.set(day, 'd');
  }

  date(year, month, day) {
    if (!this._calendar.isValid(year, month, day)) {
      throw this._calendar.invalids.invalidDate.replace(
        /\{0\}/,
        this._calendar.name
      );
    }
    this._year = year;
    this._month = month;
    this._day = day;
    return this;
  }

  add(time, type) {
    return this._calendar.add(this, time, type);
  }

  set(time, type) {
    return this._calendar.set(this, time, type);
  }

  compareTo(instance) {
    let comparer = this._year - instance._year;

    if (this._year === instance._year) {
      comparer = this._day - instance._day;
      if (this._month !== instance._month) {
        comparer = this.monthOfYear() - instance.monthOfYear();
      }
    }

    if (this._calendar.name !== instance._calendar.name) {
      throw this._calendar.invalids.differentCalendars
        .replace(/\{0\}/, this._calendar.name)
        .replace(/\{1\}/, instance._calendar.name);
    }

    return comparer === 0 ? 0 : comparer < 0 ? -1 : +1;
  }

  toJD() {
    return this._calendar.toJD(this);
  }

  fromJD(a) {
    return this._calendar.fromJD(a);
  }

  toJSDate() {
    return this._calendar.toJSDate(this);
  }

  fromJSDate(a) {
    return this._calendar.fromJSDate(a);
  }

  pad(a, b) {
    a = '' + a;
    return '000000'.substring(0, b - a.length) + a;
  }

  toString() {
    return (
      (this.year() < 0 ? '-' : '') +
      this.pad(Math.abs(this.year()), 4) +
      '-' +
      this.pad(this.month(), 2) +
      '-' +
      this.pad(this.day(), 2)
    );
  }

  leapYear() {
    return this._calendar.leapYear(this);
  }

  epoch() {
    return this._calendar.epoch(this);
  }

  formatYear() {
    return this._calendar.formatYear(this);
  }

  monthOfYear() {
    return this._calendar.monthOfYear(this);
  }

  weekOfYear() {
    return this._calendar.weekOfYear(this);
  }

  daysInYear() {
    return this._calendar.daysInYear(this);
  }

  dayOfYear() {
    return this._calendar.dayOfYear(this);
  }

  daysInMonth() {
    return this._calendar.daysInMonth(this);
  }

  dayOfWeek() {
    return this._calendar.dayOfWeek(this);
  }

  weekDay() {
    return this._calendar.weekDay(this);
  }

  extraInfo() {
    return this._calendar.extraInfo(this);
  }

  calendar() {
    return this._calendar;
  }
}

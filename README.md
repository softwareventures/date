# date

An abstract date, with no associated time zone.


## Why?

Use this type when you just want to represent a day, month and year in the
Gregorian Calendar, and the timezone is either not relevant or represented
elsewhere.

The native JavaScript `Date` type includes a time of day and timezone offset.
These are a common source of errors in code that manipulates calendar dates,
in particular off-by-one errors caused by date manipulations that cross
daylight-savings boundaries.


## Install

```bash
npm install --save @softwareventures/date
```

or

```bash
yarn add @softwareventures/date
```
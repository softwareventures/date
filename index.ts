/** @file Data types and functions for working with dates in the Gregorian calendar. */

import isInteger = require("is-integer");
import isIntegerInRange from "is-integer-in-range";

/** An date in the Gregorian calendar, with no associated time zone. */
export interface Date {
    /** The day of the month. Should be in the range 1-31. */
    day: number;
    /** The month of the year. Should be in the range 1-12. */
    month: number;
    /**
     * The year.
     *
     * Positive values represent years in the Common Era (CE/AD). For example
     * 2020 represents 2020 CE, the year this module was first published to npm.
     *
     * Negative values or zero represent years before the Common Era (BCE/BC).
     * Zero represents 1 BCE, -1 represents 2 BCE, -2 represents 3 BCE, etc.
     *
     * Note that there is no year zero in the Gregorian calendar. The year
     * 1 BCE was immediately followed by 1 CE.
     */
    year: number;
}

export const JANUARY = 1;
export const FEBRUARY = 2;
export const MARCH = 3;
export const APRIL = 4;
export const MAY = 5;
export const JUNE = 6;
export const JULY = 7;
export const AUGUST = 8;
export const SEPTEMBER = 9;
export const OCTOBER = 10;
export const NOVEMBER = 11;
export const DECEMBER = 12;

/**
 * Tests if the specified year is a leap year. Returns true if it is,
 * otherwise false.
 *
 * Positive values represent years in the Common Era (CE/AD). For example
 * 2020 represents 2020 CE, the year this module was first published to npm.
 *
 * Negative values or zero represent years before the Common Era (BCE/BC).
 * Zero represents 1 BCE, -1 represents 2 BCE, -2 represents 3 BCE, etc.
 *
 * Note that there is no year zero in the Gregorian calendar. The year
 * 1 BCE was immediately followed by 1 CE.
 */
export function isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0)
        || (year % 400 === 0);
}

/**
 * Returns the number of days in the specified month in the specified year.
 *
 * @param month - An integer representing the month, in the range 1 (January)
 *   to 12 (December).
 *
 * @param year - An integer representing the year. Positive values represent
 *   years in the Common Era (CE/AD). For example 2020 represents 2020 CE, the
 *   year this module was first published to npm. Negative values or zero
 *   represent years before the Common Era (BCE/BC). Zero represents 1 BCE,
 *   -1 represents 2 BCE, -2 represents 3 BCE, etc. There is no year zero in
 *   the Gregorian calendar. The year 1 BCE was immediately followed by 1 CE.
 */
export function daysInMonth(month: number, year: number): number {
    if (month < JANUARY || month > DECEMBER) {
        throw new Error("Invalid month");
    } else if (month === FEBRUARY && isLeapYear(year)) {
        return 29;
    } else {
        return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
    }
}

/**
 * Tests if the specified value has the shape of a Date object.
 *
 * Returns true if the value is an object with numeric year, month and day
 * fields.
 *
 * The fields may be non-integers or outside the valid range, meaning that the
 * object may not represent a valid date.
 *
 * To also test that the year, month, day are integers within the valid range,
 * use {@link isValidDate} instead.
 */
export function isDate(value: unknown): value is Date {
    return typeof value === "object"
        && value != null
        && "year" in value
        && typeof (value as { year: unknown }).year === "number"
        && "month" in value
        && typeof (value as { month: unknown }).month === "number"
        && "day" in value
        && typeof (value as { day: unknown }).day === "number";
}

export function isValidDate(value: unknown): value is Date {
    return isDate(value) && isValid(value);
}

export function isValid(date: Readonly<Date>): boolean {
    return isInteger(date.year)
        && isIntegerInRange(date.month, JANUARY, DECEMBER)
        && isIntegerInRange(date.day, 1, daysInMonth(date.month, date.year));
}

export function validate(date: Readonly<Date>): void {
    if (!isValid(date)) {
        throw new Error("Invalid date");
    }
}

export function normalize(date: Readonly<Date>): Date {
    return fromReferenceDays(toReferenceDays(date));
}

/**
 * Converts the specified date to a count of the number of days since the
 * reference date of 1st January, 1 CE.
 */
export function toReferenceDays(date: Partial<Readonly<Date>>): number {
    const day = date.day == null ? 1 : date.day;
    const month = date.month == null ? 1 : date.month;
    const year = date.year == null ? 1 : date.year;

    const referenceMonths = (year - 1) * 12 + month - 1;

    return Math.floor(referenceMonths * 365 / 12)
        + Math.floor((referenceMonths + 10) / 48)
        - Math.floor((referenceMonths + 10) / 1200)
        + Math.floor((referenceMonths + 10) / 4800)
        + [0, 1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0][(12 + (referenceMonths % 12)) % 12]
        + day - 1;
}

/**
 *  Creates a date corresponding to the specified count of the number of days
 *  since the reference date of 1st January, 1 CE.
 */
export function fromReferenceDays(referenceDays: number): Date {
    const quadricentennium = Math.floor((referenceDays + 366) / 146097);
    const dayInQuadricentennium = (referenceDays + 366) - quadricentennium * 146097;
    const centuryInQuadricentennium = dayInQuadricentennium === 0
        ? 0
        : Math.floor((dayInQuadricentennium - 1) / 36524);
    const longCentury = centuryInQuadricentennium === 0;
    const dayInCentury = dayInQuadricentennium - [0, 36525, 73049, 109573][centuryInQuadricentennium];
    const quadrenniumInCentury = Math.floor((dayInCentury + Number(centuryInQuadricentennium !== 0)) / 1461);
    const longQuadrennium = quadrenniumInCentury !== 0 || longCentury;
    const dayInQuadrennium = dayInCentury - quadrenniumInCentury * 1461
        + Number(quadrenniumInCentury !== 0 && !longCentury);
    const yearInQuadrennium = dayInQuadrennium === 0
        ? 0
        : Math.floor((dayInQuadrennium - Number(longQuadrennium)) / 365);
    const dayInYear = dayInQuadrennium - yearInQuadrennium * 365
        - Number(yearInQuadrennium !== 0 && longQuadrennium);
    const leapDay = Number(longQuadrennium && yearInQuadrennium === 0);

    const year = quadricentennium * 400 + centuryInQuadricentennium * 100
        + quadrenniumInCentury * 4 + yearInQuadrennium;
    let month: number;
    let day: number;

    if (dayInYear < 181 + leapDay) {
        if (dayInYear < 90 + leapDay) {
            if (dayInYear < 31) {
                month = 1;
                day = dayInYear + 1;
            } else if (dayInYear < 59 + leapDay) {
                month = 2;
                day = dayInYear - 30;
            } else {
                month = 3;
                day = dayInYear - 58 - leapDay;
            }
        } else if (dayInYear < 120 + leapDay) {
            month = 4;
            day = dayInYear - 89 - leapDay;
        } else if (dayInYear < 151 + leapDay) {
            month = 5;
            day = dayInYear - 119 - leapDay;
        } else {
            month = 6;
            day = dayInYear - 150 - leapDay;
        }
    } else if (dayInYear < 273 + leapDay) {
        if (dayInYear < 212 + leapDay) {
            month = 7;
            day = dayInYear - 180 - leapDay;
        } else if (dayInYear < 243 + leapDay) {
            month = 8;
            day = dayInYear - 211 - leapDay;
        } else {
            month = 9;
            day = dayInYear - 242 - leapDay;
        }
    } else if (dayInYear < 304 + leapDay) {
        month = 10;
        day = dayInYear - 272 - leapDay;
    } else if (dayInYear < 334 + leapDay) {
        month = 11;
        day = dayInYear - 303 - leapDay;
    } else {
        month = 12;
        day = dayInYear - 333 - leapDay;
    }

    return {day, month, year};
}

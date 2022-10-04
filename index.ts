/** @file Data types and functions for working with dates in the Gregorian calendar. */

import type {Comparator} from "@softwareventures/ordered";
import {Comparison} from "@softwareventures/ordered";
import isInteger = require("is-integer");
import isIntegerInRange from "is-integer-in-range";
import * as format from "@softwareventures/format-date";
import {JsDate} from "./js-date";

/** A date in the Gregorian calendar, with no associated time zone. */
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

export const JANUARY = 1; // eslint-disable-line @typescript-eslint/naming-convention
export const FEBRUARY = 2; // eslint-disable-line @typescript-eslint/naming-convention
export const MARCH = 3; // eslint-disable-line @typescript-eslint/naming-convention
export const APRIL = 4; // eslint-disable-line @typescript-eslint/naming-convention
export const MAY = 5; // eslint-disable-line @typescript-eslint/naming-convention
export const JUNE = 6; // eslint-disable-line @typescript-eslint/naming-convention
export const JULY = 7; // eslint-disable-line @typescript-eslint/naming-convention
export const AUGUST = 8; // eslint-disable-line @typescript-eslint/naming-convention
export const SEPTEMBER = 9; // eslint-disable-line @typescript-eslint/naming-convention
export const OCTOBER = 10; // eslint-disable-line @typescript-eslint/naming-convention
export const NOVEMBER = 11; // eslint-disable-line @typescript-eslint/naming-convention
export const DECEMBER = 12; // eslint-disable-line @typescript-eslint/naming-convention

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
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1]!;
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
    return (
        typeof value === "object" &&
        value != null &&
        "year" in value &&
        typeof (value as {year: unknown}).year === "number" &&
        "month" in value &&
        typeof (value as {month: unknown}).month === "number" &&
        "day" in value &&
        typeof (value as {day: unknown}).day === "number"
    );
}

/**
 * Tests if the specified value is a Date object representing a valid date.
 *
 * Returns true if the value is an object with a numeric year, month and day
 * fields and the fields are all integers inside the valid range.
 */
export function isValidDate(value: unknown): value is Date {
    return isDate(value) && isValid(value);
}

/**
 * Tests if the specified Date object represents a valid date.
 *
 * Returns true if the year, month and day fields are all integers inside the
 * valid range.
 */
export function isValid(date: Readonly<Date>): boolean {
    return (
        isInteger(date.year) &&
        isIntegerInRange(date.month, JANUARY, DECEMBER) &&
        isIntegerInRange(date.day, 1, daysInMonth(date.month, date.year))
    );
}

/**
 * Asserts that the specified Date object represents a valid date.
 *
 * @throws {Error} if any of the year, month or day fields are non-integers or
 *   outside the valid range.
 */
export function validate(date: Readonly<Date>): void {
    if (!isValid(date)) {
        throw new Error("Invalid date");
    }
}

/**
 * Normalizes the specified date object so that it represents a valid date.
 *
 * If the month or day fields are outside the valid range, then they will
 * roll over into the next month or year.
 */
export function normalize(date: Readonly<Date>): Date {
    return fromReferenceDays(toReferenceDays(date));
}

/**
 * Converts the specified date to a count of the number of days since the
 * reference date of 1st January, 1 CE.
 */
export function toReferenceDays(date: Partial<Readonly<Date>>): number {
    const day = date.day ?? 1;
    const month = date.month ?? 1;
    const year = date.year ?? 1;

    const referenceMonths = (year - 1) * 12 + month - 1;

    return (
        Math.floor((referenceMonths * 365) / 12) +
        Math.floor((referenceMonths + 10) / 48) -
        Math.floor((referenceMonths + 10) / 1200) +
        Math.floor((referenceMonths + 10) / 4800) +
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        [0, 1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0][(12 + (referenceMonths % 12)) % 12]! +
        day -
        1
    );
}

/**
 *  Creates a date corresponding to the specified count of the number of days
 *  since the reference date of 1st January, 1 CE.
 */
export function fromReferenceDays(referenceDays: number): Date {
    const quadricentennium = Math.floor((referenceDays + 366) / 146097);
    const dayInQuadricentennium = referenceDays + 366 - quadricentennium * 146097;
    const centuryInQuadricentennium =
        dayInQuadricentennium === 0 ? 0 : Math.floor((dayInQuadricentennium - 1) / 36524);
    const longCentury = centuryInQuadricentennium === 0;
    const dayInCentury =
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        dayInQuadricentennium - [0, 36525, 73049, 109573][centuryInQuadricentennium]!;
    const quadrenniumInCentury = Math.floor(
        (dayInCentury + Number(centuryInQuadricentennium !== 0)) / 1461
    );
    const longQuadrennium = quadrenniumInCentury !== 0 || longCentury;
    const dayInQuadrennium =
        dayInCentury -
        quadrenniumInCentury * 1461 +
        Number(quadrenniumInCentury !== 0 && !longCentury);
    const yearInQuadrennium =
        dayInQuadrennium === 0 ? 0 : Math.floor((dayInQuadrennium - Number(longQuadrennium)) / 365);
    const dayInYear =
        dayInQuadrennium -
        yearInQuadrennium * 365 -
        Number(yearInQuadrennium !== 0 && longQuadrennium);
    const leapDay = Number(longQuadrennium && yearInQuadrennium === 0);

    const year =
        quadricentennium * 400 +
        centuryInQuadricentennium * 100 +
        quadrenniumInCentury * 4 +
        yearInQuadrennium;
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

export function equal(a: Readonly<Date>, b: Readonly<Date>): boolean {
    return toReferenceDays(a) === toReferenceDays(b);
}

export function equalFn(b: Readonly<Date>): (a: Readonly<Date>) => boolean {
    return a => equal(a, b);
}

export function notEqual(a: Readonly<Date>, b: Readonly<Date>): boolean {
    return toReferenceDays(a) !== toReferenceDays(b);
}

export function notEqualFn(b: Readonly<Date>): (a: Readonly<Date>) => boolean {
    return a => notEqual(a, b);
}

export const compare: Comparator<Readonly<Date>> = (a, b) => {
    const ad = toReferenceDays(a);
    const bd = toReferenceDays(b);

    if (ad < bd) {
        return Comparison.before;
    } else if (ad > bd) {
        return Comparison.after;
    } else if (ad === bd) {
        return Comparison.equal;
    } else {
        return Comparison.undefined;
    }
};

export function compareFn(b: Readonly<Date>): (a: Readonly<Date>) => Comparison {
    return a => compare(a, b);
}

export function before(a: Readonly<Date>, b: Readonly<Date>): boolean {
    return toReferenceDays(a) < toReferenceDays(b);
}

export function beforeFn(b: Readonly<Date>): (a: Readonly<Date>) => boolean {
    return a => before(a, b);
}

export function beforeOrEqual(a: Readonly<Date>, b: Readonly<Date>): boolean {
    return toReferenceDays(a) <= toReferenceDays(b);
}

export function beforeOrEqualFn(b: Readonly<Date>): (a: Readonly<Date>) => boolean {
    return a => beforeOrEqual(a, b);
}

export function after(a: Readonly<Date>, b: Readonly<Date>): boolean {
    return toReferenceDays(a) > toReferenceDays(b);
}

export function afterFn(b: Readonly<Date>): (a: Readonly<Date>) => boolean {
    return a => after(a, b);
}

export function afterOrEqual(a: Readonly<Date>, b: Readonly<Date>): boolean {
    return toReferenceDays(a) >= toReferenceDays(b);
}

export function afterOrEqualFn(b: Readonly<Date>): (a: Readonly<Date>) => boolean {
    return a => afterOrEqual(a, b);
}

export function earliest<T extends Readonly<Date>, U extends Readonly<Date>>(a: T, b: U): T | U {
    return after(a, b) ? b : a;
}

export function earliestFn<T extends Readonly<Date>, U extends Readonly<Date>>(
    b: U
): (a: T) => T | U {
    return a => earliest(a, b);
}

export function latest<T extends Readonly<Date>, U extends Readonly<Date>>(a: T, b: U): T | U {
    return before(a, b) ? b : a;
}

export function latestFn<T extends Readonly<Date>, U extends Readonly<Date>>(
    b: U
): (a: T) => T | U {
    return a => latest(a, b);
}

export function todayUtc(): Date {
    const today = new JsDate();
    return {day: today.getUTCDate(), month: today.getUTCMonth() + 1, year: today.getUTCFullYear()};
}

export function todayLocal(): Date {
    const today = new JsDate();
    return {day: today.getDate(), month: today.getMonth() + 1, year: today.getFullYear()};
}

/** Parses a Date from text in ISO 8601 format.
 *
 * The ISO 8601 text must not specify a time zone offset.
 *
 * If the specified text is not a valid ISO 8601 date then this function
 * returns `null`.
 *
 * Both extended `YYYY-MM-DD` and basic `YYYYMMDD` ISO 8601 formats are
 * accepted. */
export function parseIso8601(text: string): Date | null {
    const match = /^([+-]?\d{4,})-?(\d{2})-?(\d{2})$/u.exec(text);
    if (match == null || match[1] == null || match[2] == null || match[3] == null) {
        return null;
    }

    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const day = parseInt(match[3], 10);

    return {day, month, year};
}

/** Formats the specified Date as IS0 8601 extended, e.g. `2021-05-01`.
 *
 * For other formats, see @softwareventures/format-date. */
export const formatIso8601 = format.iso8601;

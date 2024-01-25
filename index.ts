/** @file Data types and functions for working with dates in the Gregorian calendar. */

import type {Comparator} from "@softwareventures/ordered";
import {Comparison} from "@softwareventures/ordered";
import isInteger = require("is-integer");
import isIntegerInRange from "is-integer-in-range";
import * as format from "@softwareventures/format-date";
import {hasProperty} from "unknown";
import {JsDate} from "./js-date";

/** A date in the Gregorian calendar, with no associated time zone. */
export interface Date {
    /** Type discriminator identifying the object as a Date. */
    readonly type: "Date";
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

/**
 * Options required to construct a Date.
 *
 * An existing Date object may be used in place of DateOptions.
 */
export interface DateOptions {
    /**
     * Type discriminator identifying the object as a Date.
     *
     * If specified, must be the string `"Date"`. This is to prevent errors
     * caused by a DateTime being accidentally passed to Date functions.
     */
    readonly type?: "Date";
    /** The day of the month. Should be in the range 1-31. */
    readonly day: number;
    /** The month of the year. Should be in the range 1-12. */
    readonly month: number;
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
    readonly year: number;
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
        hasProperty(value, "type") &&
        value.type === "Date" &&
        hasProperty(value, "year") &&
        typeof value.year === "number" &&
        hasProperty(value, "month") &&
        typeof value.month === "number" &&
        hasProperty(value, "day") &&
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
export function isValid(date: DateOptions): boolean {
    return (
        (!hasProperty(date, "type") || date.type === "Date") &&
        isInteger(date.year) &&
        isIntegerInRange(date.month, JANUARY, DECEMBER) &&
        isIntegerInRange(date.day, 1, daysInMonth(date.month, date.year))
    );
}

/**
 * Tests if the specified Date object represents a valid date.
 *
 * Returns true if the year, month and day fields are all integers inside the
 * valid range.
 *
 * Alias for `isValid`.
 */
export const dateIsValid = isValid;

/**
 * Asserts that the specified Date object represents a valid date.
 *
 * @throws {Error} if any of the year, month or day fields are non-integers or
 *   outside the valid range.
 */
export function validate(date: DateOptions): void {
    if (!isValid(date)) {
        throw new Error("Invalid date");
    }
}

/**
 * Asserts that the specified Date object represents a valid date.
 *
 * Alias for `validate`.
 *
 * @throws {Error} if any of the year, month or day fields are non-integers or
 *   outside the valid range.
 */
export const validateDate = validate;

/**
 * Constructs a normalized date object from the specified year, month and day.
 *
 * If the month or day fields are outside the valid range, then they will
 * roll over into the next month or year.
 */
export function date(date: DateOptions): Date {
    return normalize(date);
}

/**
 * Normalizes the specified date object so that it represents a valid date.
 *
 * If the month or day fields are outside the valid range, then they will
 * roll over into the next month or year.
 */
export function normalize(date: DateOptions): Date {
    return fromReferenceDays(toReferenceDays(date));
}

/**
 * Normalizes the specified date object so that it represents a valid date.
 *
 * If the month or day fields are outside the valid range, then they will
 * roll over into the next month or year.
 *
 * Alias for `normalize`.
 */
export const normalizeDate = normalize;

/**
 * Converts the specified date to a count of the number of days since the
 * reference date of 1st January, 1 CE.
 */
export function toReferenceDays(date: Partial<DateOptions>): number {
    if (hasProperty(date, "type") && date.type !== "Date") {
        throw new TypeError();
    }

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

    return {type: "Date", day, month, year};
}

/**
 * Returns `true` if `a` and `b` refer to the same date.
 */
export function equal(a: DateOptions, b: DateOptions): boolean {
    return toReferenceDays(a) === toReferenceDays(b);
}

/**
 * Returns `true` if `a` and `b` refer to the same date.
 *
 * Alias of `equal`, for disambiguation from other equality functions.
 */
export const datesEqual = equal;

/**
 * Returns `true` if `a` and `b` refer to the same date.
 *
 * Curried variant of `equal`.
 */
export function equalFn(b: DateOptions): (a: DateOptions) => boolean {
    return a => equal(a, b);
}

/**
 * Returns `true` if `a` and `b` refer to the same date.
 *
 * Curried variant of `datesEqual`.
 */
export const datesEqualFn = equalFn;

/**
 * Returns `true` if `a` and `b` refer to different dates.
 */
export function notEqual(a: DateOptions, b: DateOptions): boolean {
    return toReferenceDays(a) !== toReferenceDays(b);
}

/**
 * Returns `true` if `a` and `b` refer to different dates.
 *
 * Alias of `notEqual`, for disambiguation from other inequality functions.
 */
export const datesNotEqual = notEqual;

/**
 * Returns `true` if `a` and `b` refer to different dates.
 *
 * Curried variant of `notEqual`.
 */
export function notEqualFn(b: DateOptions): (a: DateOptions) => boolean {
    return a => notEqual(a, b);
}

/**
 * Returns `true` if `a` and `b` refer to different dates.
 *
 * Curried variant of `datesNotEqual`.
 */
export const datesNotEqualFn = notEqualFn;

/**
 * Compares two dates and returns a `Comparison` specifying if `a` is before,
 * equal to, or after `b`.
 */
export const compare: Comparator<DateOptions> = (a, b) => {
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

/**
 * Compares two dates and returns a `Comparison` specifying if `a` is before,
 * equal to, or after `b`.
 *
 * Alias of `compare`, useful for disambiguation from other comparison functions.
 */
export const compareDates = compare;

/**
 * Compares two dates and returns a `Comparison` specifying if `a` is before,
 * equal to, or after `b`.
 *
 * Curried variant of `compare`.
 */
export function compareFn(b: DateOptions): (a: DateOptions) => Comparison {
    return a => compare(a, b);
}

/**
 * Compares two dates and returns a `Comparison` specifying if `a` is before,
 * equal to, or after `b`.
 *
 * Curried variant of `compareDates`.
 */
export const compareDatesFn = compareFn;

/**
 * Returns `true` if `a` refers to a date before `b`.
 */
export function before(a: DateOptions, b: DateOptions): boolean {
    return toReferenceDays(a) < toReferenceDays(b);
}

/**
 * Returns `true` if `a` refers to a date before `b`.
 *
 * Alias of `before`, useful for disambiguation from similar functions that
 * operate on other date/time types.
 */
export const dateBefore = before;

/**
 * Returns `true` if `a` refers to a date before `b`.
 *
 * Curried variant of `before`.
 */
export function beforeFn(b: DateOptions): (a: DateOptions) => boolean {
    return a => before(a, b);
}

/**
 * Returns `true` if `a` refers to a date before `b`.
 *
 * Curried variant of `dateBefore`.
 */
export const dateBeforeFn = beforeFn;

/**
 * Returns `true` if `a` refers to a date before or the same as `b`.
 */
export function beforeOrEqual(a: DateOptions, b: DateOptions): boolean {
    return toReferenceDays(a) <= toReferenceDays(b);
}

/**
 * Returns `true` if `a` refers to a date before or the same as `b`.
 *
 * Alias of `beforeOrEqual`, useful for disambiguation from similar
 * functions that operate on other date/time types.
 */
export const dateBeforeOrEqual = beforeOrEqual;

/**
 * Returns `true` if `a` refers to a date before or the same as `b`.
 *
 * Curried variant of `beforeOrEqual`.
 */
export function beforeOrEqualFn(b: DateOptions): (a: DateOptions) => boolean {
    return a => beforeOrEqual(a, b);
}

/**
 * Returns `true` if `a` refers to a date before or the same as `b`.
 *
 * Curried variant of `dateBeforeOrEqual`.
 */
export const dateBeforeOrEqualFn = beforeOrEqualFn;

/**
 * Returns `true` if `a` refers to a date after `b`.
 */
export function after(a: DateOptions, b: DateOptions): boolean {
    return toReferenceDays(a) > toReferenceDays(b);
}

/**
 * Returns `true` if `a` refers to a date after `b`.
 *
 * Alias of `after`, useful for disambiguation from similar functions that
 * operate on other date/time types.
 */
export const dateAfter = after;

/**
 * Returns `true` if `a` refers to a date after `b`.
 *
 * Curried variant of `after`.
 */
export function afterFn(b: DateOptions): (a: DateOptions) => boolean {
    return a => after(a, b);
}

/**
 * Returns `true` if `a` refers to a date after `b`.
 *
 * Curried variant of `dateAfter`.
 */
export const dateAfterFn = afterFn;

export function afterOrEqual(a: DateOptions, b: DateOptions): boolean {
    return toReferenceDays(a) >= toReferenceDays(b);
}

export const dateAfterOrEqual = afterOrEqual;

export function afterOrEqualFn(b: DateOptions): (a: DateOptions) => boolean {
    return a => afterOrEqual(a, b);
}

export const dateAfterOrEqualFn = afterOrEqualFn;

export function earliest<T extends DateOptions, U extends DateOptions>(a: T, b: U): T | U {
    return after(a, b) ? b : a;
}

export const earliestDate = earliest;

export function earliestFn<T extends DateOptions, U extends DateOptions>(b: U): (a: T) => T | U {
    return a => earliest(a, b);
}

export const earliestDateFn = earliestFn;

export function latest<T extends DateOptions, U extends DateOptions>(a: T, b: U): T | U {
    return before(a, b) ? b : a;
}

export const latestDate = latest;

export function latestFn<T extends DateOptions, U extends DateOptions>(b: U): (a: T) => T | U {
    return a => latest(a, b);
}

export const latestDateFn = latestFn;

export function todayUtc(): Date {
    const today = new JsDate();
    return {
        type: "Date",
        day: today.getUTCDate(),
        month: today.getUTCMonth() + 1,
        year: today.getUTCFullYear()
    };
}

export function todayLocal(): Date {
    const today = new JsDate();
    return {
        type: "Date",
        day: today.getDate(),
        month: today.getMonth() + 1,
        year: today.getFullYear()
    };
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
    if (match?.[1] == null || match[2] == null || match[3] == null) {
        return null;
    }

    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const day = parseInt(match[3], 10);

    return {type: "Date", day, month, year};
}

export const parseDateIso8601 = parseIso8601;

/** Formats the specified Date as IS0 8601 extended, e.g. `2021-05-01`.
 *
 * For other formats, see @softwareventures/format-date. */
export const formatIso8601 = format.iso8601;

export const formatDateIso8601 = format.iso8601;

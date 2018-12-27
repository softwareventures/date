import test from "ava";
import {fromReferenceDays, toReferenceDays} from "./date";

// tslint:disable:max-line-length

test("toReferenceDays({year: -400})", t => t.is(toReferenceDays({year: -400}), -146463));
test("toReferenceDays({year: -100})", t => t.is(toReferenceDays({year: -100}), -36890));
test("toReferenceDays({year: -99})", t => t.is(toReferenceDays({year: -99}), -36525));
test("toReferenceDays({year: -4})", t => t.is(toReferenceDays({year: -4}), -1827));
test("toReferenceDays({year: -3})", t => t.is(toReferenceDays({year: -3}), -1461));
test("toReferenceDays({year: -2})", t => t.is(toReferenceDays({year: -2}), -1096));
test("toReferenceDays({year: -1})", t => t.is(toReferenceDays({year: -1}), -731));
test("toReferenceDays({year: 0})", t => t.is(toReferenceDays({year: 0}), -366));
test("toReferenceDays({year: 0, month: 1})", t => t.is(toReferenceDays({year: 0, month: 1}), -366));
test("toReferenceDays({year: 0, month: 2})", t => t.is(toReferenceDays({year: 0, month: 2}), -335));
test("toReferenceDays({year: 0, month: 3})", t => t.is(toReferenceDays({year: 0, month: 3}), -306));
test("toReferenceDays({year: 0, month: 3, day: 2})", t => t.is(toReferenceDays({year: 0, month: 3, day: 2}), -305));
test("toReferenceDays({year: 1, month: 0})", t => t.is(toReferenceDays({year: 1, month: 0}), -31));
test("toReferenceDays({})", t => t.is(toReferenceDays({}), 0));
test("toReferenceDays({month: 1})", t => t.is(toReferenceDays({month: 1}), 0));
test("toReferenceDays({day: 1})", t => t.is(toReferenceDays({day: 1}), 0));
test("toReferenceDays({year: 1, month: 1, day: 1})", t => t.is(toReferenceDays({year: 1, month: 1, day: 1}), 0));
test("toReferenceDays({day: 2})", t => t.is(toReferenceDays({day: 2}), 1));
test("toReferenceDays({year: 1, month: 1, day: 2})", t => t.is(toReferenceDays({year: 1, month: 1, day: 2}), 1));
test("toReferenceDays({month: 1, day: 3})", t => t.is(toReferenceDays({month: 1, day: 3}), 2));
test("toReferenceDays({year: 1, day: 4})", t => t.is(toReferenceDays({year: 1, day: 4}), 3));
test("toReferenceDays({year: 1, month: 1, day: 31})", t => t.is(toReferenceDays({year: 1, month: 1, day: 31}), 30));
test("toReferenceDays({month: 2})", t => t.is(toReferenceDays({month: 2}), 31));
test("toReferenceDays({day: 32})", t => t.is(toReferenceDays({day: 32}), 31));
test("toReferenceDays({year: 1, month: 2, day: 1})", t => t.is(toReferenceDays({year: 1, month: 2, day: 1}), 31));
test("toReferenceDays({year: 1, month: 2, day: 28})", t => t.is(toReferenceDays({year: 1, month: 2, day: 28}), 58));
test("toReferenceDays({month: 3, day: -1})", t => t.is(toReferenceDays({month: 3, day: -1}), 57));
test("toReferenceDays({month: 2, day: 29})", t => t.is(toReferenceDays({month: 2, day: 29}), 59));
test("toReferenceDays({month: 3})", t => t.is(toReferenceDays({month: 3}), 59));
test("toReferenceDays({year: 1, month: 3, day: 1})", t => t.is(toReferenceDays({year: 1, month: 3, day: 1}), 59));
test("toReferenceDays({year: 1, month: 3, day: 31})", t => t.is(toReferenceDays({year: 1, month: 3, day: 31}), 89));
test("toReferenceDays({month: 4})", t => t.is(toReferenceDays({month: 4}), 90));
test("toReferenceDays({year: 1, month: 4, day: 1})", t => t.is(toReferenceDays({year: 1, month: 4, day: 1}), 90));
test("toReferenceDays({year: 1, month: 4, day: 30})", t => t.is(toReferenceDays({year: 1, month: 4, day: 30}), 119));
test("toReferenceDays({month: 5})", t => t.is(toReferenceDays({month: 5}), 120));
test("toReferenceDays({year: 1, month: 5, day: 1})", t => t.is(toReferenceDays({year: 1, month: 5, day: 1}), 120));
test("toReferenceDays({year: 1, month: 5, day: 31})", t => t.is(toReferenceDays({year: 1, month: 5, day: 31}), 150));
test("toReferenceDays({month: 6})", t => t.is(toReferenceDays({month: 6}), 151));
test("toReferenceDays({year: 1, month: 6, day: 1})", t => t.is(toReferenceDays({year: 1, month: 6, day: 1}), 151));
test("toReferenceDays({year: 1, month: 6, day: 30})", t => t.is(toReferenceDays({year: 1, month: 6, day: 30}), 180));
test("toReferenceDays({month: 7})", t => t.is(toReferenceDays({month: 7}), 181));
test("toReferenceDays({year: 1, month: 7, day: 1})", t => t.is(toReferenceDays({year: 1, month: 7, day: 1}), 181));
test("toReferenceDays({year: 1, month: 7, day: 31})", t => t.is(toReferenceDays({year: 1, month: 7, day: 31}), 211));
test("toReferenceDays({month: 8})", t => t.is(toReferenceDays({month: 8}), 212));
test("toReferenceDays({year: 1, month: 8, day: 1})", t => t.is(toReferenceDays({year: 1, month: 8, day: 1}), 212));
test("toReferenceDays({year: 1, month: 8, day: 31})", t => t.is(toReferenceDays({year: 1, month: 8, day: 31}), 242));
test("toReferenceDays({month: 9})", t => t.is(toReferenceDays({month: 9}), 243));
test("toReferenceDays({year: 1, month: 9, day: 1})", t => t.is(toReferenceDays({year: 1, month: 9, day: 1}), 243));
test("toReferenceDays({year: 1, month: 9, day: 30})", t => t.is(toReferenceDays({year: 1, month: 9, day: 30}), 272));
test("toReferenceDays({month: 10})", t => t.is(toReferenceDays({month: 10}), 273));
test("toReferenceDays({year: 1, month: 10, day: 1})", t => t.is(toReferenceDays({year: 1, month: 10, day: 1}), 273));
test("toReferenceDays({year: 1, month: 10, day: 31})", t => t.is(toReferenceDays({year: 1, month: 10, day: 31}), 303));
test("toReferenceDays({month: 11})", t => t.is(toReferenceDays({month: 11}), 304));
test("toReferenceDays({year: 1, month: 11, day: 1})", t => t.is(toReferenceDays({year: 1, month: 11, day: 1}), 304));
test("toReferenceDays({year: 1, month: 11, day: 30})", t => t.is(toReferenceDays({year: 1, month: 11, day: 30}), 333));
test("toReferenceDays({month: 12})", t => t.is(toReferenceDays({month: 12}), 334));
test("toReferenceDays({year: 1, month: 12, day: 1})", t => t.is(toReferenceDays({year: 1, month: 12, day: 1}), 334));
test("toReferenceDays({year: 1, month: 12, day: 31})", t => t.is(toReferenceDays({year: 1, month: 12, day: 31}), 364));
test("toReferenceDays({month: 13})", t => t.is(toReferenceDays({month: 13}), 365));
test("toReferenceDays({year: 2})", t => t.is(toReferenceDays({year: 2}), 365));
test("toReferenceDays({year: 2, month: 1, day: 1})", t => t.is(toReferenceDays({year: 2, month: 1, day: 1}), 365));
test("toReferenceDays({year: 2, month: 1, day: 31})", t => t.is(toReferenceDays({year: 2, month: 1, day: 31}), 395));
test("toReferenceDays({month: 14})", t => t.is(toReferenceDays({month: 14}), 396));
test("toReferenceDays({year: 2, month: 2})", t => t.is(toReferenceDays({year: 2, month: 2}), 396));
test("toReferenceDays({year: 2, month: 2, day: 1})", t => t.is(toReferenceDays({year: 2, month: 2, day: 1}), 396));
test("toReferenceDays({year: 2, month: 2, day: 28})", t => t.is(toReferenceDays({year: 2, month: 2, day: 28}), 423));
test("toReferenceDays({month: 15})", t => t.is(toReferenceDays({month: 15}), 424));
test("toReferenceDays({year: 2, month: 3, day: 1})", t => t.is(toReferenceDays({year: 2, month: 3, day: 1}), 424));
test("toReferenceDays({month: 16})", t => t.is(toReferenceDays({month: 16}), 455));
test("toReferenceDays({month: 17})", t => t.is(toReferenceDays({month: 17}), 485));
test("toReferenceDays({month: 18})", t => t.is(toReferenceDays({month: 18}), 516));
test("toReferenceDays({month: 19})", t => t.is(toReferenceDays({month: 19}), 546));
test("toReferenceDays({month: 20})", t => t.is(toReferenceDays({month: 20}), 577));
test("toReferenceDays({month: 21})", t => t.is(toReferenceDays({month: 21}), 608));
test("toReferenceDays({month: 22})", t => t.is(toReferenceDays({month: 22}), 638));
test("toReferenceDays({month: 23})", t => t.is(toReferenceDays({month: 23}), 669));
test("toReferenceDays({month: 24})", t => t.is(toReferenceDays({month: 24}), 699));
test("toReferenceDays({year: 2, month: 12, day: 31})", t => t.is(toReferenceDays({year: 2, month: 12, day: 31}), 729));
test("toReferenceDays({month: 25})", t => t.is(toReferenceDays({month: 25}), 730));
test("toReferenceDays({year: 2, month: 13})", t => t.is(toReferenceDays({year: 2, month: 13}), 730));
test("toReferenceDays({year: 3, month: 1, day: 1})", t => t.is(toReferenceDays({year: 3, month: 1, day: 1}), 730));
test("toReferenceDays({month: 26})", t => t.is(toReferenceDays({month: 26}), 761));
test("toReferenceDays({year: 4, month: -10})", t => t.is(toReferenceDays({year: 4, month: -10}), 761));
test("toReferenceDays({month: 27})", t => t.is(toReferenceDays({month: 27}), 789));
test("toReferenceDays({month: 28})", t => t.is(toReferenceDays({month: 28}), 820));
test("toReferenceDays({month: 29})", t => t.is(toReferenceDays({month: 29}), 850));
test("toReferenceDays({month: 30})", t => t.is(toReferenceDays({month: 30}), 881));
test("toReferenceDays({month: 31})", t => t.is(toReferenceDays({month: 31}), 911));
test("toReferenceDays({month: 32})", t => t.is(toReferenceDays({month: 32}), 942));
test("toReferenceDays({month: 33})", t => t.is(toReferenceDays({month: 33}), 973));
test("toReferenceDays({month: 34})", t => t.is(toReferenceDays({month: 34}), 1003));
test("toReferenceDays({month: 35})", t => t.is(toReferenceDays({month: 35}), 1034));
test("toReferenceDays({month: 36})", t => t.is(toReferenceDays({month: 36}), 1064));
test("toReferenceDays({year: 3, month: 12, day: 31})", t => t.is(toReferenceDays({year: 3, month: 12, day: 31}), 1094));
test("toReferenceDays({month: 37})", t => t.is(toReferenceDays({month: 37}), 1095));
test("toReferenceDays({year: 4, month: 1, day: 1})", t => t.is(toReferenceDays({year: 4, month: 1, day: 1}), 1095));
test("toReferenceDays({year: 4, month: 1, day: 31})", t => t.is(toReferenceDays({year: 4, month: 1, day: 31}), 1125));
test("toReferenceDays({month: 38})", t => t.is(toReferenceDays({month: 38}), 1126));
test("toReferenceDays({year: 4, month: 2})", t => t.is(toReferenceDays({year: 4, month: 2}), 1126));
test("toReferenceDays({year: 4, month: 2, day: 1})", t => t.is(toReferenceDays({year: 4, month: 2, day: 1}), 1126));
test("toReferenceDays({year: 4, month: 2, day: 28})", t => t.is(toReferenceDays({year: 4, month: 2, day: 28}), 1153));
test("toReferenceDays({year: 4, month: 2, day: 29})", t => t.is(toReferenceDays({year: 4, month: 2, day: 29}), 1154));
test("toReferenceDays({year: 4, month: 3, day: 1})", t => t.is(toReferenceDays({year: 4, month: 3, day: 1}), 1155));
test("toReferenceDays({month: 39})", t => t.is(toReferenceDays({month: 39}), 1155));
test("toReferenceDays({year: 4, month: 3, day: 31})", t => t.is(toReferenceDays({year: 4, month: 3, day: 31}), 1185));
test("toReferenceDays({month: 40})", t => t.is(toReferenceDays({month: 40}), 1186));
test("toReferenceDays({year: 4, month: 4, day: 1})", t => t.is(toReferenceDays({year: 4, month: 4, day: 1}), 1186));
test("toReferenceDays({year: 4, month: 4, day: 30})", t => t.is(toReferenceDays({year: 4, month: 4, day: 30}), 1215));
test("toReferenceDays({month: 41})", t => t.is(toReferenceDays({month: 41}), 1216));
test("toReferenceDays({year: 4, month: 5, day: 1})", t => t.is(toReferenceDays({year: 4, month: 5, day: 1}), 1216));
test("toReferenceDays({year: 4, month: 5, day: 31})", t => t.is(toReferenceDays({year: 4, month: 5, day: 31}), 1246));
test("toReferenceDays({month: 42})", t => t.is(toReferenceDays({month: 42}), 1247));
test("toReferenceDays({year: 4, month: 6, day: 1})", t => t.is(toReferenceDays({year: 4, month: 6, day: 1}), 1247));
test("toReferenceDays({year: 4, month: 6, day: 30})", t => t.is(toReferenceDays({year: 4, month: 6, day: 30}), 1276));
test("toReferenceDays({month: 43})", t => t.is(toReferenceDays({month: 43}), 1277));
test("toReferenceDays({year: 4, month: 7, day: 1})", t => t.is(toReferenceDays({year: 4, month: 7, day: 1}), 1277));
test("toReferenceDays({year: 4, month: 7, day: 31})", t => t.is(toReferenceDays({year: 4, month: 7, day: 31}), 1307));
test("toReferenceDays({month: 44})", t => t.is(toReferenceDays({month: 44}), 1308));
test("toReferenceDays({year: 4, month: 8, day: 1})", t => t.is(toReferenceDays({year: 4, month: 8, day: 1}), 1308));
test("toReferenceDays({year: 4, month: 8, day: 31})", t => t.is(toReferenceDays({year: 4, month: 8, day: 31}), 1338));
test("toReferenceDays({month: 45})", t => t.is(toReferenceDays({month: 45}), 1339));
test("toReferenceDays({year: 4, month: 9, day: 1})", t => t.is(toReferenceDays({year: 4, month: 9, day: 1}), 1339));
test("toReferenceDays({year: 4, month: 9, day: 30})", t => t.is(toReferenceDays({year: 4, month: 9, day: 30}), 1368));
test("toReferenceDays({month: 46})", t => t.is(toReferenceDays({month: 46}), 1369));
test("toReferenceDays({year: 4, month: 10, day: 1})", t => t.is(toReferenceDays({year: 4, month: 10, day: 1}), 1369));
test("toReferenceDays({year: 4, month: 10, day: 31})", t => t.is(toReferenceDays({year: 4, month: 10, day: 31}), 1399));
test("toReferenceDays({month: 47})", t => t.is(toReferenceDays({month: 47}), 1400));
test("toReferenceDays({year: 4, month: 11, day: 1})", t => t.is(toReferenceDays({year: 4, month: 11, day: 1}), 1400));
test("toReferenceDays({year: 4, month: 11, day: 30})", t => t.is(toReferenceDays({year: 4, month: 11, day: 30}), 1429));
test("toReferenceDays({month: 48})", t => t.is(toReferenceDays({month: 48}), 1430));
test("toReferenceDays({year: 4, month: 12, day: 1})", t => t.is(toReferenceDays({year: 4, month: 12, day: 1}), 1430));
test("toReferenceDays({year: 4, month: 12, day: 31})", t => t.is(toReferenceDays({year: 4, month: 12, day: 31}), 1460));
test("toReferenceDays({month: 49})", t => t.is(toReferenceDays({month: 49}), 1461));
test("toReferenceDays({year: 5, month: 1, day: 1})", t => t.is(toReferenceDays({year: 5, month: 1, day: 1}), 1461));
test("toReferenceDays({month: 50})", t => t.is(toReferenceDays({month: 50}), 1492));
test("toReferenceDays({year: 5, month: 12, day: 31})", t => t.is(toReferenceDays({year: 5, month: 12, day: 31}), 1825));
test("toReferenceDays({year: 6, month: 1, day: 1})", t => t.is(toReferenceDays({year: 6, month: 1, day: 1}), 1826));
test("toReferenceDays({year: 6, month: 12, day: 31})", t => t.is(toReferenceDays({year: 6, month: 12, day: 31}), 2190));
test("toReferenceDays({year: 7, month: 12, day: 31})", t => t.is(toReferenceDays({year: 7, month: 12, day: 31}), 2555));
test("toReferenceDays({year: 8, month: 1, day: 1})", t => t.is(toReferenceDays({year: 8, month: 1, day: 1}), 2556));
test("toReferenceDays({year: 8, month: 2, day: 29})", t => t.is(toReferenceDays({year: 8, month: 2, day: 29}), 2615));
test("toReferenceDays({year: 8, month: 3, day: 1})", t => t.is(toReferenceDays({year: 8, month: 3, day: 1}), 2616));
test("toReferenceDays({year: 8, month: 12, day: 31})", t => t.is(toReferenceDays({year: 8, month: 12, day: 31}), 2921));
test("toReferenceDays({year: 9, month: 1, day: 1})", t => t.is(toReferenceDays({year: 9, month: 1, day: 1}), 2922));
test("toReferenceDays({month: 1188})", t => t.is(toReferenceDays({month: 1188}), 36128));
test("toReferenceDays({year: 99, month: 12, day: 31})", t => t.is(toReferenceDays({year: 99, month: 12, day: 31}), 36158));
test("toReferenceDays({month: 1189})", t => t.is(toReferenceDays({month: 1189}), 36159));
test("toReferenceDays({year: 100, month: 1, day: 1})", t => t.is(toReferenceDays({year: 100, month: 1, day: 1}), 36159));
test("toReferenceDays({month: 1190})", t => t.is(toReferenceDays({month: 1190}), 36190));
test("toReferenceDays({year: 100, month: 2, day: 28})", t => t.is(toReferenceDays({year: 100, month: 2, day: 28}), 36217));
test("toReferenceDays({month: 1191})", t => t.is(toReferenceDays({month: 1191}), 36218));
test("toReferenceDays({year: 100, month: 3, day: 1})", t => t.is(toReferenceDays({year: 100, month: 3, day: 1}), 36218));
test("toReferenceDays({month: 1192})", t => t.is(toReferenceDays({month: 1192}), 36249));
test("toReferenceDays({month: 1200})", t => t.is(toReferenceDays({month: 1200}), 36493));
test("toReferenceDays({year: 100, month: 12, day: 31})", t => t.is(toReferenceDays({year: 100, month: 12, day: 31}), 36523));
test("toReferenceDays({month: 1201})", t => t.is(toReferenceDays({month: 1201}), 36524));
test("toReferenceDays({year: 101, month: 1, day: 1})", t => t.is(toReferenceDays({year: 101, month: 1, day: 1}), 36524));
test("toReferenceDays({month: 1202})", t => t.is(toReferenceDays({month: 1202}), 36555));
test("toReferenceDays({month: 1203})", t => t.is(toReferenceDays({month: 1203}), 36583));
test("toReferenceDays({month: 1204})", t => t.is(toReferenceDays({month: 1204}), 36614));
test("toReferenceDays({year: 101, month: 12, day: 31})", t => t.is(toReferenceDays({year: 101, month: 12, day: 31}), 36888));
test("toReferenceDays({month: 1213})", t => t.is(toReferenceDays({month: 1213}), 36889));
test("toReferenceDays({year: 102, month: 12, day: 31})", t => t.is(toReferenceDays({year: 102, month: 12, day: 31}), 37253));
test("toReferenceDays({year: 103, month: 1, day: 1})", t => t.is(toReferenceDays({year: 103, month: 1, day: 1}), 37254));
test("toReferenceDays({year: 103, month: 1, day: 31})", t => t.is(toReferenceDays({year: 103, month: 1, day: 31}), 37284));
test("toReferenceDays({year: 103, month: 2, day: 1})", t => t.is(toReferenceDays({year: 103, month: 2, day: 1}), 37285));
test("toReferenceDays({year: 103, month: 2, day: 28})", t => t.is(toReferenceDays({year: 103, month: 2, day: 28}), 37312));
test("toReferenceDays({year: 103, month: 3, day: 1})", t => t.is(toReferenceDays({year: 103, month: 3, day: 1}), 37313));
test("toReferenceDays({month: 4788})", t => t.is(toReferenceDays({month: 4788}), 145700));
test("toReferenceDays({month: 4789})", t => t.is(toReferenceDays({month: 4789}), 145731));
test("toReferenceDays({month: 4790})", t => t.is(toReferenceDays({month: 4790}), 145762));
test("toReferenceDays({month: 4791})", t => t.is(toReferenceDays({month: 4791}), 145791));
test("toReferenceDays({month: 4792})", t => t.is(toReferenceDays({month: 4792}), 145822));
test("toReferenceDays({month: 4800})", t => t.is(toReferenceDays({month: 4800}), 146066));
test("toReferenceDays({month: 4801})", t => t.is(toReferenceDays({month: 4801}), 146097));
test("toReferenceDays({month: 4802})", t => t.is(toReferenceDays({month: 4802}), 146128));
test("toReferenceDays({month: 4803})", t => t.is(toReferenceDays({month: 4803}), 146156));

test("fromReferenceDays(0)", t => t.deepEqual(fromReferenceDays(0), {year: 1, month: 1, day: 1}));
test("fromReferenceDays(1)", t => t.deepEqual(fromReferenceDays(1), {year: 1, month: 1, day: 2}));
test("fromReferenceDays(30)", t => t.deepEqual(fromReferenceDays(30), {year: 1, month: 1, day: 31}));
test("fromReferenceDays(31)", t => t.deepEqual(fromReferenceDays(31), {year: 1, month: 2, day: 1}));
test("fromReferenceDays(58)", t => t.deepEqual(fromReferenceDays(58), {year: 1, month: 2, day: 28}));
test("fromReferenceDays(59)", t => t.deepEqual(fromReferenceDays(59), {year: 1, month: 3, day: 1}));
test("fromReferenceDays(89)", t => t.deepEqual(fromReferenceDays(89), {year: 1, month: 3, day: 31}));
test("fromReferenceDays(90)", t => t.deepEqual(fromReferenceDays(90), {year: 1, month: 4, day: 1}));
test("fromReferenceDays(119)", t => t.deepEqual(fromReferenceDays(119), {year: 1, month: 4, day: 30}));
test("fromReferenceDays(120)", t => t.deepEqual(fromReferenceDays(120), {year: 1, month: 5, day: 1}));
test("fromReferenceDays(150)", t => t.deepEqual(fromReferenceDays(150), {year: 1, month: 5, day: 31}));
test("fromReferenceDays(151)", t => t.deepEqual(fromReferenceDays(151), {year: 1, month: 6, day: 1}));
test("fromReferenceDays(180)", t => t.deepEqual(fromReferenceDays(180), {year: 1, month: 6, day: 30}));
test("fromReferenceDays(181)", t => t.deepEqual(fromReferenceDays(181), {year: 1, month: 7, day: 1}));
test("fromReferenceDays(211)", t => t.deepEqual(fromReferenceDays(211), {year: 1, month: 7, day: 31}));
test("fromReferenceDays(212)", t => t.deepEqual(fromReferenceDays(212), {year: 1, month: 8, day: 1}));
test("fromReferenceDays(242)", t => t.deepEqual(fromReferenceDays(242), {year: 1, month: 8, day: 31}));
test("fromReferenceDays(243)", t => t.deepEqual(fromReferenceDays(243), {year: 1, month: 9, day: 1}));
test("fromReferenceDays(272)", t => t.deepEqual(fromReferenceDays(272), {year: 1, month: 9, day: 30}));
test("fromReferenceDays(273)", t => t.deepEqual(fromReferenceDays(273), {year: 1, month: 10, day: 1}));
test("fromReferenceDays(303)", t => t.deepEqual(fromReferenceDays(303), {year: 1, month: 10, day: 31}));
test("fromReferenceDays(304)", t => t.deepEqual(fromReferenceDays(304), {year: 1, month: 11, day: 1}));
test("fromReferenceDays(333)", t => t.deepEqual(fromReferenceDays(333), {year: 1, month: 11, day: 30}));
test("fromReferenceDays(334)", t => t.deepEqual(fromReferenceDays(334), {year: 1, month: 12, day: 1}));
test("fromReferenceDays(364)", t => t.deepEqual(fromReferenceDays(364), {year: 1, month: 12, day: 31}));
test("fromReferenceDays(365)", t => t.deepEqual(fromReferenceDays(365), {year: 2, month: 1, day: 1}));
test("fromReferenceDays(395)", t => t.deepEqual(fromReferenceDays(395), {year: 2, month: 1, day: 31}));
test("fromReferenceDays(396)", t => t.deepEqual(fromReferenceDays(396), {year: 2, month: 2, day: 1}));
test("fromReferenceDays(423)", t => t.deepEqual(fromReferenceDays(423), {year: 2, month: 2, day: 28}));
test("fromReferenceDays(424)", t => t.deepEqual(fromReferenceDays(424), {year: 2, month: 3, day: 1}));
test("fromReferenceDays(729)", t => t.deepEqual(fromReferenceDays(729), {year: 2, month: 12, day: 31}));
test("fromReferenceDays(730)", t => t.deepEqual(fromReferenceDays(730), {year: 3, month: 1, day: 1}));
test("fromReferenceDays(1094)", t => t.deepEqual(fromReferenceDays(1094), {year: 3, month: 12, day: 31}));
test("fromReferenceDays(1095)", t => t.deepEqual(fromReferenceDays(1095), {year: 4, month: 1, day: 1}));
test("fromReferenceDays(1125)", t => t.deepEqual(fromReferenceDays(1125), {year: 4, month: 1, day: 31}));
test("fromReferenceDays(1126)", t => t.deepEqual(fromReferenceDays(1126), {year: 4, month: 2, day: 1}));
test("fromReferenceDays(1153)", t => t.deepEqual(fromReferenceDays(1153), {year: 4, month: 2, day: 28}));
test("fromReferenceDays(1154)", t => t.deepEqual(fromReferenceDays(1154), {year: 4, month: 2, day: 29}));
test("fromReferenceDays(1155)", t => t.deepEqual(fromReferenceDays(1155), {year: 4, month: 3, day: 1}));
test("fromReferenceDays(1185)", t => t.deepEqual(fromReferenceDays(1185), {year: 4, month: 3, day: 31}));
test("fromReferenceDays(1186)", t => t.deepEqual(fromReferenceDays(1186), {year: 4, month: 4, day: 1}));
test("fromReferenceDays(1215)", t => t.deepEqual(fromReferenceDays(1215), {year: 4, month: 4, day: 30}));
test("fromReferenceDays(1216)", t => t.deepEqual(fromReferenceDays(1216), {year: 4, month: 5, day: 1}));
test("fromReferenceDays(1246)", t => t.deepEqual(fromReferenceDays(1246), {year: 4, month: 5, day: 31}));
test("fromReferenceDays(1247)", t => t.deepEqual(fromReferenceDays(1247), {year: 4, month: 6, day: 1}));
test("fromReferenceDays(1276)", t => t.deepEqual(fromReferenceDays(1276), {year: 4, month: 6, day: 30}));
test("fromReferenceDays(1277)", t => t.deepEqual(fromReferenceDays(1277), {year: 4, month: 7, day: 1}));
test("fromReferenceDays(1307)", t => t.deepEqual(fromReferenceDays(1307), {year: 4, month: 7, day: 31}));
test("fromReferenceDays(1308)", t => t.deepEqual(fromReferenceDays(1308), {year: 4, month: 8, day: 1}));
test("fromReferenceDays(1338)", t => t.deepEqual(fromReferenceDays(1338), {year: 4, month: 8, day: 31}));
test("fromReferenceDays(1339)", t => t.deepEqual(fromReferenceDays(1339), {year: 4, month: 9, day: 1}));
test("fromReferenceDays(1368)", t => t.deepEqual(fromReferenceDays(1368), {year: 4, month: 9, day: 30}));
test("fromReferenceDays(1369)", t => t.deepEqual(fromReferenceDays(1369), {year: 4, month: 10, day: 1}));
test("fromReferenceDays(1399)", t => t.deepEqual(fromReferenceDays(1399), {year: 4, month: 10, day: 31}));
test("fromReferenceDays(1400)", t => t.deepEqual(fromReferenceDays(1400), {year: 4, month: 11, day: 1}));
test("fromReferenceDays(1429)", t => t.deepEqual(fromReferenceDays(1429), {year: 4, month: 11, day: 30}));
test("fromReferenceDays(1430)", t => t.deepEqual(fromReferenceDays(1430), {year: 4, month: 12, day: 1}));
test("fromReferenceDays(1460)", t => t.deepEqual(fromReferenceDays(1460), {year: 4, month: 12, day: 31}));
test("fromReferenceDays(1461)", t => t.deepEqual(fromReferenceDays(1461), {year: 5, month: 1, day: 1}));
test("fromReferenceDays(1825)", t => t.deepEqual(fromReferenceDays(1825), {year: 5, month: 12, day: 31}));
test("fromReferenceDays(1826)", t => t.deepEqual(fromReferenceDays(1826), {year: 6, month: 1, day: 1}));
test("fromReferenceDays(2190)", t => t.deepEqual(fromReferenceDays(2190), {year: 6, month: 12, day: 31}));
test("fromReferenceDays(2555)", t => t.deepEqual(fromReferenceDays(2555), {year: 7, month: 12, day: 31}));
test("fromReferenceDays(2556)", t => t.deepEqual(fromReferenceDays(2556), {year: 8, month: 1, day: 1}));
test("fromReferenceDays(2615)", t => t.deepEqual(fromReferenceDays(2615), {year: 8, month: 2, day: 29}));
test("fromReferenceDays(2616)", t => t.deepEqual(fromReferenceDays(2616), {year: 8, month: 3, day: 1}));
test("fromReferenceDays(2921)", t => t.deepEqual(fromReferenceDays(2921), {year: 8, month: 12, day: 31}));
test("fromReferenceDays(2922)", t => t.deepEqual(fromReferenceDays(2922), {year: 9, month: 1, day: 1}));
test("fromReferenceDays(36158)", t => t.deepEqual(fromReferenceDays(36158), {year: 99, month: 12, day: 31}));
test("fromReferenceDays(36159)", t => t.deepEqual(fromReferenceDays(36159), {year: 100, month: 1, day: 1}));
test("fromReferenceDays(36217)", t => t.deepEqual(fromReferenceDays(36217), {year: 100, month: 2, day: 28}));
test("fromReferenceDays(36218)", t => t.deepEqual(fromReferenceDays(36218), {year: 100, month: 3, day: 1}));
test("fromReferenceDays(36523)", t => t.deepEqual(fromReferenceDays(36523), {year: 100, month: 12, day: 31}));
test("fromReferenceDays(36524)", t => t.deepEqual(fromReferenceDays(36524), {year: 101, month: 1, day: 1}));
test("fromReferenceDays(36888)", t => t.deepEqual(fromReferenceDays(36888), {year: 101, month: 12, day: 31}));
test("fromReferenceDays(37253)", t => t.deepEqual(fromReferenceDays(37253), {year: 102, month: 12, day: 31}));
test("fromReferenceDays(37254)", t => t.deepEqual(fromReferenceDays(37254), {year: 103, month: 1, day: 1}));
test("fromReferenceDays(37284)", t => t.deepEqual(fromReferenceDays(37284), {year: 103, month: 1, day: 31}));
test("fromReferenceDays(37285)", t => t.deepEqual(fromReferenceDays(37285), {year: 103, month: 2, day: 1}));
test("fromReferenceDays(37312)", t => t.deepEqual(fromReferenceDays(37312), {year: 103, month: 2, day: 28}));
test("fromReferenceDays(37313)", t => t.deepEqual(fromReferenceDays(37313), {year: 103, month: 3, day: 1}));
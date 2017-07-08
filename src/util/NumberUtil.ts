import * as numeral from "numeral";

export default class NumberUtil {
    public static formatCurrency(value: number): string {
        return numeral(value).format("$0,0.00");
    }
}

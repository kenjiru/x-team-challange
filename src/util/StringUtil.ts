export default class StringUtil {
    public static capitalize(str: string = ""): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

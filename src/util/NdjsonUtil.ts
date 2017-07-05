import * as _ from "lodash";

export default class NdjsonUtil {
    public static parse<T>(data: string): T[] {
        let lines: string[] = _.filter(data.split("\n"), (line: string) => _.isEmpty(line) === false);

        return _.map(lines, (line: string): T => JSON.parse(line));
    }
}

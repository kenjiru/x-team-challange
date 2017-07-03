import * as Moment from "moment";
import {duration} from "moment";
import {DateRange, extendMoment, MomentRangeExtends} from "moment-range";

const moment: MomentRangeExtends & Moment.Moment = extendMoment(Moment);

class DateUtil {
    public static formatDate(date: string): string {
        let dealRange: DateRange = moment.range(moment(), moment(date));

        return duration(dealRange.valueOf()).humanize();
    }
}

export default DateUtil;

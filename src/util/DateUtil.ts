import * as Moment from "moment";
import {duration, Duration} from "moment";
import {DateRange, extendMoment, MomentRangeExtends} from "moment-range";

const moment: MomentRangeExtends & Moment.Moment = extendMoment(Moment);

class DateUtil {
    public static DATE_FORMAT: string = "YYYY-MM-DD";

    public static formatDate(date: string): string {
        let dealRange: DateRange = moment.range(moment(), moment(date));
        let timeDuration: Duration = duration(dealRange.valueOf());

        if (timeDuration.asDays() > -7) {
            return timeDuration.humanize() + " ago";
        }

        return moment(date).format(DateUtil.DATE_FORMAT);
    }
}

export default DateUtil;

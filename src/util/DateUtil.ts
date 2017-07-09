import * as moment from "moment";
import {Moment} from "moment";
import {duration, Duration} from "moment";
import {DateRange, extendMoment, MomentRangeExtends} from "moment-range";

const momentRange: MomentRangeExtends & moment.Moment = extendMoment(moment);

class DateUtil {
    public static DATE_FORMAT: string = "YYYY-MM-DD";
    private static DATE_INPUT_FORMAT: string = "ddd MMM D YYYY HH:mm:ss ZZ";

    public static formatDate(date: string): string {
        let momentDate: Moment = momentRange(date, DateUtil.DATE_INPUT_FORMAT);
        let dealRange: DateRange = momentRange.range(momentRange(), momentDate);
        let timeDuration: Duration = duration(dealRange.valueOf());

        if (timeDuration.asDays() > -7) {
            return timeDuration.humanize() + " ago";
        }

        return momentRange(date).format(DateUtil.DATE_FORMAT);
    }
}

export default DateUtil;

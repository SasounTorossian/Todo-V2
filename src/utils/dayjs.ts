import dayjs from "dayjs";
import 'dayjs/locale/en-gb';
import utc from "dayjs/plugin/utc";

export default dayjs.extend(utc);

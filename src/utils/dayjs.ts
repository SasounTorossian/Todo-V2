import dayjs from "dayjs";
import 'dayjs/locale/en-gb';
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export default dayjs

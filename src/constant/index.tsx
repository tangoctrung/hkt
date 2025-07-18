import dayjs, { Dayjs } from "dayjs";

export const TOKEN_FAKE = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6IiJ9.BlU9J7t-dlap8_qUy6I_uSh161iElnv-5E2B-l1ZxwE"
export const IMAGE_DEFAULT = "https://firebasestorage.googleapis.com/v0/b/socialtnt-6007a.appspot.com/o/avatar%2F6220d0b1e0843900165a3030%2CNguy%E1%BB%85n%20H%E1%BA%A3o%2F74703545_2751175491605988_4160941892340547584_n.jpg?alt=media&token=f0b04435-2df1-4eef-8eb0-f7667f4571eb"
export const NO_DATA = 'https://store.vtctelecom.com.vn/Content/images/no-data.png'
export const defaultRange: [Dayjs, Dayjs] = [
  dayjs().subtract(7, 'day').startOf('day'),
  dayjs().endOf('day'),
];

export const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
  "#1677ff", "#13c2c2", "#52c41a", "#faad14", "#f5222d",
  "#722ed1", "#eb2f96", "#fa541c", "#2f54eb", "#a0d911",
  "#08979c", "#d3adf7", "#ffc53d", "#597ef7", "#9254de",
  "#ff85c0", "#ff7a45", "#36cfc9", "#73d13d", "#ffec3d",
  "#ff4d4f", "#b37feb", "#ffd666", "#ff6f91", "#6be585",
  "#5cdbd3", "#bae637", "#ffd3b6", "#ff9c6e", "#ffc0cb"
]
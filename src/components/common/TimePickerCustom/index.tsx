import React, { useState } from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(isoWeek);

const { RangePicker } = DatePicker;

const isSameRange = (a?: [Dayjs, Dayjs], b?: [Dayjs, Dayjs]) => {
  return (
    a &&
    b &&
    a[0].isSame(b[0], 'day') &&
    a[1].isSame(b[1], 'day')
  );
};

export default function TimePickerCustom({
  rangeValue,
  setRangeValue
}: {
  rangeValue?: [fromDate: Dayjs, toDate: Dayjs];
  setRangeValue?: (rangeDate: [fromDate: Dayjs, toDate: Dayjs]) => void;
}) {
  const presets: {
    label: string;
    value: [Dayjs, Dayjs];
  }[] = [
      {
        label: 'Hôm qua',
        value: [
          dayjs().subtract(1, 'day').startOf('day'),
          dayjs().subtract(1, 'day').endOf('day'),
        ],
      },
      {
        label: 'Tuần này',
        value: [dayjs().isoWeekday(1), dayjs()],
      },
      {
        label: 'Tuần trước',
        value: [
          dayjs().isoWeekday(1).subtract(1, 'week'),
          dayjs().isoWeekday(7).subtract(1, 'week'),
        ],
      },
      {
        label: '7 ngày trước',
        value: [
          dayjs().subtract(7, 'day').startOf('day'),
          dayjs().endOf('day'),
        ],
      },
      {
        label: '30 ngày trước',
        value: [
          dayjs().subtract(30, 'day').startOf('day'),
          dayjs().endOf('day'),
        ],
      },
      {
        label: '90 ngày trước',
        value: [
          dayjs().subtract(90, 'day').startOf('day'),
          dayjs().endOf('day'),
        ],
      },
      {
        label: '12 tháng trước',
        value: [
          dayjs().subtract(12, 'month').startOf('day'),
          dayjs().endOf('day'),
        ],
      },
      {
        label: 'Năm nay(Tháng 1 đến nay)',
        value: [dayjs().startOf('year'), dayjs()], // 👈 từ 1/1 đến thời điểm hiện tại
      },
    ];

  const [label, setLabel] = useState<string>('7 ngày trước');

  const handleChange = (value: any) => {
    if (!setRangeValue) return;
    if (value && value[0] && value[1]) {
      setRangeValue(value as [Dayjs, Dayjs]);

      const found = presets.find((preset) =>
        isSameRange(preset.value, value as [Dayjs, Dayjs])
      );
      setLabel(found?.label || 'Tuỳ chỉnh');
    } else {
      // setRangeValue(null);
      setLabel('');
    }
  };

  return (
    <div className='flex items-center bg-white px-4 rounded-lg gap-2 shadow-md'>
      <p className='font-semibold'>{label}</p>
      <RangePicker
        presets={presets}
        format="DD-MM-YYYY"
        value={rangeValue}
        onChange={handleChange}
        allowClear
        style={{ width: 240, height: 40, fontSize: 20, fontWeight: 500, border: "none", outline: "none" }}
      />
    </div>
  );
}

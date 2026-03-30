export function generateIcsUrl(title: string, date: Date, description?: string, allDay?: boolean): string {
  const pad = (n: number) => n.toString().padStart(2, '0');

  const formatDate = (d: Date) =>
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

  const formatAllDay = (d: Date) =>
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;

  const start = allDay ? formatAllDay(date) : formatDate(date);
  const endDate = new Date(date);
  if (allDay) {
    endDate.setDate(endDate.getDate() + 1);
  } else {
    endDate.setHours(endDate.getHours() + 1);
  }
  const end = allDay ? formatAllDay(endDate) : formatDate(endDate);

  const escaped = (s: string) => s.replace(/[,;\\]/g, (m) => '\\' + m).replace(/\n/g, '\\n');

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Life Command Center//EN',
    'BEGIN:VEVENT',
    allDay ? `DTSTART;VALUE=DATE:${start}` : `DTSTART:${start}`,
    allDay ? `DTEND;VALUE=DATE:${end}` : `DTEND:${end}`,
    `SUMMARY:${escaped(title)}`,
    description ? `DESCRIPTION:${escaped(description)}` : '',
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean).join('\r\n');

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}

export function parseSchoolDate(dateDisplay: string, year: number = 2026): Date | null {
  // dateDisplay format: "Mar 3", "Apr 14–18", "May 26"
  const match = dateDisplay.match(/^(\w+)\s+(\d+)/);
  if (!match) return null;

  const months: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };

  const month = months[match[1]];
  if (month === undefined) return null;

  return new Date(year, month, parseInt(match[2]));
}

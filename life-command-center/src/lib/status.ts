import { TrackerStatus } from '@/types';

export function calculateStatus(
  lastDate: string | null,
  frequencyMonths: number,
  notes: string | null
): TrackerStatus {
  if (!lastDate || frequencyMonths === 0) {
    if (notes && notes.toLowerCase().includes('lapsed')) {
      return { label: 'LAPSED', color: 'red' };
    }
    if (notes && notes.toLowerCase().includes('overdue')) {
      return { label: 'CHECK STATUS', color: 'red' };
    }
    if (!lastDate && frequencyMonths > 0) {
      return { label: 'No date set', color: 'red' };
    }
    return { label: notes || 'Manual tracking', color: 'gray' };
  }

  const last = new Date(lastDate);
  const nextDue = new Date(last);
  nextDue.setMonth(nextDue.getMonth() + frequencyMonths);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const fortyFiveDaysFromNow = new Date(today);
  fortyFiveDaysFromNow.setDate(fortyFiveDaysFromNow.getDate() + 45);

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  if (nextDue < today) {
    return { label: 'OVERDUE', color: 'red' };
  }

  if (nextDue < fortyFiveDaysFromNow) {
    return { label: `Due ${monthNames[nextDue.getMonth()]}`, color: 'yellow' };
  }

  return {
    label: `Due ~${monthNames[nextDue.getMonth()]} ${nextDue.getFullYear()}`,
    color: 'green',
  };
}

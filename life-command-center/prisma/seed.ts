import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.recurringItem.deleteMany();
  await prisma.urgentItem.deleteMany();
  await prisma.schoolEvent.deleteMany();

  // Recurring Items
  const recurringItems = [
    { name: 'Dentist — Lauren', icon: '🦷', frequencyMonths: 6, lastDate: null, provider: 'Swish (512) 827-0057 · Kelly Lane (512) 678-9999', notes: null, sortOrder: 1 },
    { name: 'Dentist — Kids (Shine Pediatric)', icon: '🦷', frequencyMonths: 6, lastDate: new Date('2025-11-03'), provider: 'Shine Pediatric (512) 294-1116 · Round Rock', notes: null, sortOrder: 2 },
    { name: 'Pediatrician — Delilah', icon: '👧', frequencyMonths: 12, lastDate: new Date('2025-09-15'), provider: 'Dr. Judith Enders · ARC Kelly Lane (737) 220-7200', notes: null, sortOrder: 3 },
    { name: 'Pediatrician — Ace', icon: '👦', frequencyMonths: 12, lastDate: null, provider: 'Dr. Judith Enders · ARC Kelly Lane (737) 220-7200', notes: null, sortOrder: 4 },
    { name: 'Ace — Psychology referral', icon: '🧠', frequencyMonths: 0, lastDate: new Date('2025-11-03'), provider: 'Dr. Givner · ARC Far West · Expires 11/3/2026', notes: null, sortOrder: 5 },
    { name: 'OB/GYN — Lauren', icon: '👩‍⚕️', frequencyMonths: 12, lastDate: new Date('2025-07-29'), provider: 'Dr. Leah D Tatum · ARC North Austin (512) 994-2662', notes: null, sortOrder: 6 },
    { name: 'Mammogram', icon: '🩻', frequencyMonths: 12, lastDate: new Date('2025-09-17'), provider: 'ARA Diagnostic · Cedar Park', notes: null, sortOrder: 7 },
    { name: 'Eye exam — Lauren', icon: '👁️', frequencyMonths: 12, lastDate: new Date('2025-09-30'), provider: 'Munoz Eye Care · Round Rock', notes: null, sortOrder: 8 },
    { name: 'Legion Health', icon: '🧠', frequencyMonths: 1, lastDate: new Date('2026-03-05'), provider: 'Georgia Dixon · monthly', notes: null, sortOrder: 9 },
    { name: 'Penny — annual wellness', icon: '🐶', frequencyMonths: 12, lastDate: new Date('2025-05-07'), provider: 'VCA Hometown (512) 251-2242 · Pflugerville', notes: null, sortOrder: 10 },
    { name: 'Penny — ProHeart 12', icon: '💉', frequencyMonths: 12, lastDate: new Date('2025-12-04'), provider: 'VCA Hometown · heartworm injection', notes: null, sortOrder: 11 },
    { name: 'Penny — flea prevention', icon: '🪳', frequencyMonths: 0, lastDate: null, provider: 'Was overdue May \'25. Check with VCA.', notes: null, sortOrder: 12 },
    { name: 'Oil change', icon: '🛢️', frequencyMonths: 6, lastDate: new Date('2025-11-11'), provider: '2024 KIA · plate WGP8199', notes: null, sortOrder: 13 },
    { name: 'Vehicle registration', icon: '🚗', frequencyMonths: 12, lastDate: new Date('2026-03-04'), provider: 'TxDMV', notes: null, sortOrder: 14 },
    { name: "Driver's license", icon: '🪪', frequencyMonths: 72, lastDate: new Date('2026-01-31'), provider: 'Texas.gov', notes: null, sortOrder: 15 },
    { name: 'Renters insurance', icon: '🏠', frequencyMonths: 12, lastDate: new Date('2025-03-22'), provider: 'Lemonade · LAPSED', notes: null, sortOrder: 16 },
  ];

  for (const item of recurringItems) {
    await prisma.recurringItem.create({ data: item });
  }

  // Urgent Items
  const urgentItems = [
    { icon: '🏠', text: 'Renters insurance LAPSED', detail: 'Lemonade policy expired 3/22/2025. Renew ASAP or find new provider.', color: 'red' },
    { icon: '🦷', text: 'Dentist overdue — Lauren', detail: 'No recent visit on file. Call Swish (512) 827-0057 or Kelly Lane (512) 678-9999.', color: 'red' },
    { icon: '🦷', text: 'Kids dental due May 2026', detail: 'Shine Pediatric (512) 294-1116. Last visit 11/3/2025, due ~May 2026.', color: 'yellow' },
    { icon: '🚗', text: 'Bridgecrest payment', detail: 'Ensure auto payment is current. Check Bridgecrest account.', color: 'red' },
    { icon: '🐶', text: 'Penny wellness overdue', detail: 'Last annual wellness 5/7/2025. Due ~May 2026. Call VCA (512) 251-2242.', color: 'yellow' },
    { icon: '🪳', text: 'Penny flea prevention', detail: 'Was overdue as of May 2025. Check with VCA Hometown.', color: 'red' },
    { icon: '👦', text: 'Ace — schedule pediatrician', detail: 'No visit on file. Dr. Judith Enders · ARC Kelly Lane (737) 220-7200.', color: 'red' },
    { icon: '🛢️', text: 'Oil change due ~May 2026', detail: 'Last changed 11/11/2025. 2024 KIA plate WGP8199.', color: 'yellow' },
  ];

  for (const item of urgentItems) {
    await prisma.urgentItem.create({ data: item });
  }

  // School Events (March-May 2026)
  const schoolEvents = [
    { dateDisplay: 'Mar 2', eventText: 'Texas Independence Day — school holiday', source: 'PFISD', type: 'event', sortKey: '2026-03-02' },
    { dateDisplay: 'Mar 6', eventText: 'End of 4th six weeks', source: 'PFISD', type: 'info', sortKey: '2026-03-06' },
    { dateDisplay: 'Mar 9-13', eventText: 'Spring Break — no school', source: 'PFISD', type: 'event', sortKey: '2026-03-09' },
    { dateDisplay: 'Mar 16', eventText: 'Classes resume', source: 'PFISD', type: 'info', sortKey: '2026-03-16' },
    { dateDisplay: 'Mar 20', eventText: 'Report cards available', source: 'PFISD', type: 'action', sortKey: '2026-03-20' },
    { dateDisplay: 'Mar 27', eventText: 'Caldwell Pre-K spirit day — pajama day', source: 'Caldwell', type: 'event', sortKey: '2026-03-27' },
    { dateDisplay: 'Mar 31', eventText: 'Highland Park book fair begins', source: 'Highland Park', type: 'event', sortKey: '2026-03-31' },
    { dateDisplay: 'Apr 2', eventText: 'Highland Park parent-teacher conferences', source: 'Highland Park', type: 'action', sortKey: '2026-04-02' },
    { dateDisplay: 'Apr 3', eventText: 'Caldwell Pre-K spring pictures', source: 'Caldwell', type: 'action', sortKey: '2026-04-03' },
    { dateDisplay: 'Apr 7', eventText: 'STAAR testing begins (Highland Park)', source: 'Highland Park', type: 'info', sortKey: '2026-04-07' },
    { dateDisplay: 'Apr 10', eventText: 'Caldwell Pre-K field trip permission slips due', source: 'Caldwell', type: 'action', sortKey: '2026-04-10' },
    { dateDisplay: 'Apr 14', eventText: 'Highland Park book fair ends', source: 'Highland Park', type: 'event', sortKey: '2026-04-14' },
    { dateDisplay: 'Apr 17', eventText: 'End of 5th six weeks', source: 'PFISD', type: 'info', sortKey: '2026-04-17' },
    { dateDisplay: 'Apr 18', eventText: 'Student holiday / Staff development', source: 'PFISD', type: 'event', sortKey: '2026-04-18' },
    { dateDisplay: 'Apr 21', eventText: 'Caldwell Pre-K field trip', source: 'Caldwell', type: 'event', sortKey: '2026-04-21' },
    { dateDisplay: 'Apr 24', eventText: 'Report cards available', source: 'PFISD', type: 'action', sortKey: '2026-04-24' },
    { dateDisplay: 'Apr 28', eventText: 'Teacher Appreciation Week begins', source: 'PFISD', type: 'event', sortKey: '2026-04-28' },
    { dateDisplay: 'May 1', eventText: 'Highland Park talent show', source: 'Highland Park', type: 'event', sortKey: '2026-05-01' },
    { dateDisplay: 'May 5', eventText: 'Caldwell Pre-K Mothers Day craft & tea', source: 'Caldwell', type: 'event', sortKey: '2026-05-05' },
    { dateDisplay: 'May 8', eventText: 'Highland Park spring concert', source: 'Highland Park', type: 'event', sortKey: '2026-05-08' },
    { dateDisplay: 'May 15', eventText: 'Caldwell Pre-K graduation ceremony', source: 'Caldwell', type: 'event', sortKey: '2026-05-15' },
    { dateDisplay: 'May 22', eventText: 'Last day of school — early release', source: 'PFISD', type: 'event', sortKey: '2026-05-22' },
    { dateDisplay: 'May 25', eventText: 'Memorial Day', source: 'PFISD', type: 'info', sortKey: '2026-05-25' },
    { dateDisplay: 'May 26', eventText: 'Teacher work day (no students)', source: 'PFISD', type: 'info', sortKey: '2026-05-26' },
    { dateDisplay: 'May 29', eventText: 'End of 6th six weeks / Final report cards', source: 'PFISD', type: 'action', sortKey: '2026-05-29' },
  ];

  for (const event of schoolEvents) {
    await prisma.schoolEvent.create({ data: event });
  }

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

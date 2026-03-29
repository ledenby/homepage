export interface CheerDrill {
  text: string;
  surface?: string;
}

export interface CheerDay {
  date: string;
  dayOfWeek: string;
  duration: string;
  type: 'bwo' | 'ro' | 'full' | 'rest' | 'gym';
  typeLabel: string;
  title: string;
  drills: CheerDrill[];
}

export interface CheerWeek {
  weekNumber: number;
  title: string;
  dateRange: string;
  focus: string;
  days: CheerDay[];
}

export const cheerPlan: { name: string; weeks: CheerWeek[] } = {
  name: 'Mini Prep 1.1 — Back Walkover & Round-Off',
  weeks: [
    {
      weekNumber: 1,
      title: 'FOUNDATION',
      dateRange: 'Feb 17 – Feb 23',
      focus: 'Build the base: bridge, flexibility, core strength, basic rolls',
      days: [
        {
          date: '2026-02-17', dayOfWeek: 'Monday', duration: '30 min', type: 'bwo',
          typeLabel: 'BWO Day', title: 'Bridge + Flexibility',
          drills: [
            { text: 'Warm-up: 3 min jumping jacks + arm circles' },
            { text: 'Deep lunge hold — 30 sec each side x 2' },
            { text: 'Half-split stretch — 30 sec each side' },
            { text: 'Full split slide-down — 30 sec each side (pillow under hip if needed)' },
            { text: 'Bridge push-up from floor — hold 15 sec x 5 reps' },
            { text: 'Bridge rocks — 10 rocks x 3 sets', surface: 'Tumble Mat' },
            { text: 'Shoulder stretch: wall slides — 30 sec x 3' },
            { text: 'Hollow body hold — 15 sec x 3' },
            { text: 'Superman hold — 15 sec x 3' },
          ],
        },
        {
          date: '2026-02-18', dayOfWeek: 'Tuesday', duration: '30 min', type: 'ro',
          typeLabel: 'RO Day', title: 'Cartwheel + Handstand',
          drills: [
            { text: 'Warm-up: 3 min running + arm circles' },
            { text: 'Deep lunge hold — 30 sec each side' },
            { text: 'Line drill cartwheels — 10 reps', surface: 'Grass' },
            { text: 'Lunge → cartwheel → lunge — 5 each side', surface: 'Grass' },
            { text: 'Belly-to-wall handstand — hold 20 sec x 3' },
            { text: 'Plank hold — 20 sec x 3' },
            { text: '8-count motion drill (slow) — High V, Low V, T, Broken T' },
          ],
        },
        {
          date: '2026-02-19', dayOfWeek: 'Wednesday', duration: '15 min', type: 'rest',
          typeLabel: 'REST', title: 'Light stretch only',
          drills: [
            { text: 'Full body stretch — 10 min' },
            { text: 'Butterfly stretch — 30 sec x 2' },
            { text: 'Straddle stretch — 30 sec x 2' },
            { text: 'Shoulder rolls — 10 each direction' },
          ],
        },
        {
          date: '2026-02-20', dayOfWeek: 'Thursday', duration: '30 min', type: 'bwo',
          typeLabel: 'BWO Day', title: 'Bridge Kickover Prep',
          drills: [
            { text: 'Warm-up: 3 min jumping jacks' },
            { text: 'Deep lunge hold — 30 sec each side' },
            { text: 'Bridge push-up — hold 15 sec x 5' },
            { text: 'Bridge with one leg lift — 5 each leg x 3 sets' },
            { text: 'Wall walk-down to bridge — 3 reps' },
            { text: 'Hollow body rocks — 10 x 3' },
            { text: 'Superman rocks — 10 x 3' },
          ],
        },
        {
          date: '2026-02-21', dayOfWeek: 'Friday', duration: '30 min', type: 'ro',
          typeLabel: 'RO Day', title: 'Power + Hurdle',
          drills: [
            { text: 'Warm-up: 3 min running' },
            { text: 'Hurdle step practice — 10 reps each side' },
            { text: 'Line drill cartwheels — 10 reps', surface: 'Grass' },
            { text: 'Cartwheel snap-down — 5 each side', surface: 'Tumble Mat' },
            { text: 'Handstand hold against wall — 20 sec x 3' },
            { text: 'Tuck jumps — 10 x 3 sets' },
            { text: 'V-ups — 10 x 3' },
          ],
        },
        {
          date: '2026-02-22', dayOfWeek: 'Saturday', duration: '90 min', type: 'gym',
          typeLabel: 'GYM', title: 'Team practice at gym',
          drills: [
            { text: 'Team practice — stunts, routine, tumbling' },
          ],
        },
        {
          date: '2026-02-23', dayOfWeek: 'Sunday', duration: '15 min', type: 'rest',
          typeLabel: 'REST', title: 'Light stretch + journal',
          drills: [
            { text: 'Full body stretch — 10 min' },
            { text: 'Journal: what felt good this week?' },
          ],
        },
      ],
    },
    {
      weekNumber: 2,
      title: 'BRIDGE MASTERY',
      dateRange: 'Feb 24 – Mar 1',
      focus: 'Bridge kickover drills, cartwheel refinement',
      days: [
        {
          date: '2026-02-24', dayOfWeek: 'Monday', duration: '30 min', type: 'bwo',
          typeLabel: 'BWO Day', title: 'Bridge Kickover Drills',
          drills: [
            { text: 'Warm-up: 3 min jumping jacks + high knees' },
            { text: 'Deep lunge hold — 30 sec each side x 2' },
            { text: 'Bridge push-up — hold 20 sec x 5 reps' },
            { text: 'Bridge with alternating leg lifts — 5 each leg x 3', surface: 'Tumble Mat' },
            { text: 'Bridge kickover off panel mat — 5 reps', surface: 'Panel Mat' },
            { text: 'Shoulder stretch on wall — 30 sec x 3' },
            { text: 'Hollow body hold — 20 sec x 3' },
          ],
        },
        {
          date: '2026-02-25', dayOfWeek: 'Tuesday', duration: '30 min', type: 'ro',
          typeLabel: 'RO Day', title: 'Cartwheel Power',
          drills: [
            { text: 'Warm-up: 3 min running + arm circles' },
            { text: 'Hurdle step — 10 reps each side' },
            { text: 'Cartwheel over line — 10 reps (focus on straight legs)', surface: 'Grass' },
            { text: 'Cartwheel snap-down to stick — 5 each side', surface: 'Tumble Mat' },
            { text: 'Handstand against wall — 25 sec x 3' },
            { text: 'Plank to pike — 8 reps x 3 sets' },
            { text: 'Jump half-turn drill — 10 reps' },
          ],
        },
        {
          date: '2026-02-26', dayOfWeek: 'Wednesday', duration: '15 min', type: 'rest',
          typeLabel: 'REST', title: 'Light stretch only',
          drills: [
            { text: 'Full body stretch — 10 min' },
            { text: 'Splits practice — 30 sec each side' },
            { text: 'Wrist circles — 10 each direction' },
          ],
        },
        {
          date: '2026-02-27', dayOfWeek: 'Thursday', duration: '30 min', type: 'bwo',
          typeLabel: 'BWO Day', title: 'Wall Walk Bridge',
          drills: [
            { text: 'Warm-up: 3 min jumping jacks' },
            { text: 'Wall walk-down to bridge — 5 reps' },
            { text: 'Wall walk-up from bridge — 3 reps' },
            { text: 'Bridge kickover off panel mat — 5 reps', surface: 'Panel Mat' },
            { text: 'Hollow body rocks — 15 x 3' },
            { text: 'Superman hold — 20 sec x 3' },
            { text: 'Candlestick roll to stand — 5 reps', surface: 'Tumble Mat' },
          ],
        },
        {
          date: '2026-02-28', dayOfWeek: 'Friday', duration: '35 min', type: 'full',
          typeLabel: 'FULL', title: 'Both Skills',
          drills: [
            { text: 'Warm-up: 3 min running + arm circles' },
            { text: 'Bridge push-up — hold 20 sec x 3' },
            { text: 'Bridge kickover off panel mat — 5 reps', surface: 'Panel Mat' },
            { text: 'Cartwheels — 10 reps', surface: 'Grass' },
            { text: 'Cartwheel snap-down — 5 reps', surface: 'Tumble Mat' },
            { text: 'Handstand hold — 20 sec x 3' },
            { text: 'Core: hollow body + superman combo — 10 each x 2' },
          ],
        },
        {
          date: '2026-03-01', dayOfWeek: 'Saturday', duration: '90 min', type: 'gym',
          typeLabel: 'GYM', title: 'Team practice at gym',
          drills: [{ text: 'Team practice — stunts, routine, tumbling' }],
        },
        {
          date: '2026-03-02', dayOfWeek: 'Sunday', duration: '15 min', type: 'rest',
          typeLabel: 'REST', title: 'Light stretch only',
          drills: [
            { text: 'Full body stretch — 10 min' },
            { text: 'Foam roll legs — 5 min' },
          ],
        },
      ],
    },
    {
      weekNumber: 3,
      title: 'KICKOVER CONFIDENCE',
      dateRange: 'Mar 2 – Mar 8',
      focus: 'Bridge kickover with spot, round-off entry',
      days: [
        {
          date: '2026-03-02', dayOfWeek: 'Monday', duration: '30 min', type: 'bwo',
          typeLabel: 'BWO Day', title: 'Kickover with Barrel',
          drills: [
            { text: 'Warm-up: 3 min jumping jacks + high knees' },
            { text: 'Bridge push-up — hold 20 sec x 5' },
            { text: 'Bridge kickover over barrel — 5 reps', surface: 'Barrel' },
            { text: 'Bridge kickover on flat — 3 attempts', surface: 'Tumble Mat' },
            { text: 'Wall walk-down and up — 3 reps' },
            { text: 'Hollow body hold — 25 sec x 3' },
            { text: 'Shoulder flexibility: wall angels — 10 reps' },
          ],
        },
        {
          date: '2026-03-03', dayOfWeek: 'Tuesday', duration: '30 min', type: 'ro',
          typeLabel: 'RO Day', title: 'Round-off Entry',
          drills: [
            { text: 'Warm-up: 3 min running' },
            { text: 'Hurdle to cartwheel — 10 reps', surface: 'Grass' },
            { text: 'Hurdle to round-off (two feet landing) — 5 reps', surface: 'Tumble Mat' },
            { text: 'Round-off snap-down drill — 5 reps', surface: 'Tumble Mat' },
            { text: 'Handstand snap-down — 5 reps', surface: 'Panel Mat' },
            { text: 'Rebound jumps after snap-down — 5 reps' },
            { text: 'V-ups — 12 x 3' },
          ],
        },
        {
          date: '2026-03-04', dayOfWeek: 'Wednesday', duration: '15 min', type: 'rest',
          typeLabel: 'REST', title: 'Light stretch only',
          drills: [
            { text: 'Full body stretch — 10 min' },
            { text: 'Splits practice — 1 min each side' },
          ],
        },
        {
          date: '2026-03-05', dayOfWeek: 'Thursday', duration: '35 min', type: 'bwo',
          typeLabel: 'BWO Day', title: 'Kickover from Elevated',
          drills: [
            { text: 'Warm-up: 3 min jumping jacks' },
            { text: 'Bridge kickover off cheese mat — 5 reps', surface: 'Cheese Mat' },
            { text: 'Bridge kickover on flat — 5 attempts', surface: 'Tumble Mat' },
            { text: 'Standing backbend to bridge — 3 reps' },
            { text: 'Wall walk-down (hands closer to feet) — 3 reps' },
            { text: 'Hollow body rocks — 15 x 3' },
            { text: 'Superman rocks — 15 x 3' },
            { text: 'Wrist stretches — 1 min' },
          ],
        },
        {
          date: '2026-03-06', dayOfWeek: 'Friday', duration: '35 min', type: 'full',
          typeLabel: 'FULL', title: 'Combo Day',
          drills: [
            { text: 'Warm-up: 3 min running + arm circles' },
            { text: 'Bridge kickover — 5 reps', surface: 'Tumble Mat' },
            { text: 'Round-off from hurdle — 5 reps', surface: 'Tumble Mat' },
            { text: 'Cartwheel → round-off combo — 3 reps', surface: 'Grass' },
            { text: 'Handstand hold — 25 sec x 3' },
            { text: 'Tuck jumps — 10 x 3' },
            { text: 'Core circuit: hollow body, superman, V-up — 10 each' },
          ],
        },
        {
          date: '2026-03-07', dayOfWeek: 'Saturday', duration: '90 min', type: 'gym',
          typeLabel: 'GYM', title: 'Team practice at gym',
          drills: [{ text: 'Team practice — stunts, routine, tumbling' }],
        },
        {
          date: '2026-03-08', dayOfWeek: 'Sunday', duration: '15 min', type: 'rest',
          typeLabel: 'REST', title: 'Light stretch + journal',
          drills: [
            { text: 'Full body stretch — 10 min' },
            { text: 'Journal: what skill improved most?' },
          ],
        },
      ],
    },
    {
      weekNumber: 4,
      title: 'WALKOVER INTRO',
      dateRange: 'Mar 9 – Mar 15 (Spring Break)',
      focus: 'Standing kickover prep, lighter schedule',
      days: [
        {
          date: '2026-03-09', dayOfWeek: 'Monday', duration: '25 min', type: 'bwo',
          typeLabel: 'BWO Day', title: 'Standing Kickover Prep',
          drills: [
            { text: 'Warm-up: 3 min jumping jacks' },
            { text: 'Standing backbend to bridge — 5 reps' },
            { text: 'Bridge kickover on flat — 5 reps', surface: 'Tumble Mat' },
            { text: 'Stand → bridge → kickover → stand — 3 attempts', surface: 'Tumble Mat' },
            { text: 'Hollow body hold — 25 sec x 3' },
            { text: 'Splits — 1 min each side' },
          ],
        },
        {
          date: '2026-03-10', dayOfWeek: 'Tuesday', duration: '25 min', type: 'ro',
          typeLabel: 'RO Day', title: 'Round-off Snap',
          drills: [
            { text: 'Warm-up: 3 min running' },
            { text: 'Hurdle to round-off — 8 reps', surface: 'Tumble Mat' },
            { text: 'Round-off rebound to jump — 5 reps', surface: 'Tumble Mat' },
            { text: 'Handstand snap-down — 5 reps', surface: 'Panel Mat' },
            { text: 'Core: V-ups — 12 x 3' },
          ],
        },
        {
          date: '2026-03-11', dayOfWeek: 'Wednesday', duration: '15 min', type: 'rest',
          typeLabel: 'REST', title: 'Spring Break stretch',
          drills: [
            { text: 'Full body stretch — 10 min' },
            { text: 'Relax and enjoy the break!' },
          ],
        },
        {
          date: '2026-03-12', dayOfWeek: 'Thursday', duration: '15 min', type: 'rest',
          typeLabel: 'REST', title: 'Spring Break rest',
          drills: [
            { text: 'Light stretch — 10 min' },
            { text: 'Visualize your back walkover — 5 min' },
          ],
        },
        {
          date: '2026-03-13', dayOfWeek: 'Friday', duration: '30 min', type: 'full',
          typeLabel: 'FULL', title: 'Review All Skills',
          drills: [
            { text: 'Warm-up: 3 min jumping jacks + running' },
            { text: 'Bridge kickover — 5 reps', surface: 'Tumble Mat' },
            { text: 'Round-off from hurdle — 5 reps', surface: 'Tumble Mat' },
            { text: 'Standing backbend — 3 reps' },
            { text: 'Handstand hold — 25 sec x 3' },
            { text: 'Core combo: 10 hollow body + 10 superman + 10 V-ups' },
          ],
        },
        {
          date: '2026-03-14', dayOfWeek: 'Saturday', duration: '15 min', type: 'rest',
          typeLabel: 'REST', title: 'Spring Break rest',
          drills: [{ text: 'Full body stretch — 15 min' }],
        },
        {
          date: '2026-03-15', dayOfWeek: 'Sunday', duration: '15 min', type: 'rest',
          typeLabel: 'REST', title: 'Rest + prep for next week',
          drills: [
            { text: 'Full body stretch — 10 min' },
            { text: 'Set goals for Week 5' },
          ],
        },
      ],
    },
    {
      weekNumber: 5,
      title: 'WALKOVER BUILDING',
      dateRange: 'Mar 16 – Mar 22',
      focus: 'Standing back walkover attempts, round-off landing',
      days: [
        {
          date: '2026-03-16', dayOfWeek: 'Monday', duration: '35 min', type: 'bwo',
          typeLabel: 'BWO Day', title: 'Back Walkover Attempts',
          drills: [
            { text: 'Warm-up: 3 min jumping jacks + arm circles' },
            { text: 'Standing backbend to bridge — 5 reps' },
            { text: 'Bridge kickover — 5 reps', surface: 'Tumble Mat' },
            { text: 'Back walkover with spot — 5 attempts', surface: 'Tumble Mat' },
            { text: 'Back walkover off cheese mat — 3 reps', surface: 'Cheese Mat' },
            { text: 'Hollow body hold — 30 sec x 3' },
            { text: 'Splits — 1 min each side' },
            { text: 'Wrist stretches — 1 min' },
          ],
        },
        {
          date: '2026-03-17', dayOfWeek: 'Tuesday', duration: '35 min', type: 'ro',
          typeLabel: 'RO Day', title: 'Round-off Landing Drill',
          drills: [
            { text: 'Warm-up: 3 min running + high knees' },
            { text: 'Hurdle to round-off — 10 reps', surface: 'Tumble Mat' },
            { text: 'Round-off rebound — stick landing — 5 reps', surface: 'Tumble Mat' },
            { text: 'Round-off to backfall on mat — 5 reps', surface: 'Panel Mat' },
            { text: 'Handstand snap-down — 8 reps', surface: 'Panel Mat' },
            { text: 'Tuck jumps — 10 x 3' },
            { text: 'Core: V-ups — 15 x 3' },
          ],
        },
        {
          date: '2026-03-18', dayOfWeek: 'Wednesday', duration: '15 min', type: 'rest',
          typeLabel: 'REST', title: 'Light stretch',
          drills: [
            { text: 'Full body stretch — 10 min' },
            { text: 'Wrist and shoulder mobility — 5 min' },
          ],
        },
        {
          date: '2026-03-19', dayOfWeek: 'Thursday', duration: '35 min', type: 'bwo',
          typeLabel: 'BWO Day', title: 'Back Walkover with Spot',
          drills: [
            { text: 'Warm-up: 3 min jumping jacks' },
            { text: 'Standing backbend — 5 reps' },
            { text: 'Back walkover with spot — 5 reps', surface: 'Tumble Mat' },
            { text: 'Back walkover solo attempts — 3 reps', surface: 'Tumble Mat' },
            { text: 'Bridge kickover — 5 reps', surface: 'Tumble Mat' },
            { text: 'Superman rocks — 15 x 3' },
            { text: 'Hollow body rocks — 15 x 3' },
          ],
        },
        {
          date: '2026-03-20', dayOfWeek: 'Friday', duration: '40 min', type: 'full',
          typeLabel: 'FULL', title: 'Both Skills Progress',
          drills: [
            { text: 'Warm-up: 3 min running + jumping jacks' },
            { text: 'Back walkover — 5 attempts', surface: 'Tumble Mat' },
            { text: 'Round-off rebound — 5 reps', surface: 'Tumble Mat' },
            { text: 'Standing backbend → bridge kickover — 3 reps', surface: 'Tumble Mat' },
            { text: 'Handstand hold — 30 sec x 3' },
            { text: 'Core circuit x 2: hollow body, superman, V-ups — 15 each' },
            { text: 'Splits — 1 min each side' },
          ],
        },
        {
          date: '2026-03-21', dayOfWeek: 'Saturday', duration: '90 min', type: 'gym',
          typeLabel: 'GYM', title: 'Team practice at gym',
          drills: [{ text: 'Team practice — stunts, routine, tumbling' }],
        },
        {
          date: '2026-03-22', dayOfWeek: 'Sunday', duration: '15 min', type: 'rest',
          typeLabel: 'REST', title: 'Light stretch + journal',
          drills: [
            { text: 'Full body stretch — 10 min' },
            { text: 'Journal: rate your back walkover progress 1-10' },
          ],
        },
      ],
    },
    {
      weekNumber: 6,
      title: 'REFINEMENT',
      dateRange: 'Mar 23 – Mar 29',
      focus: 'Clean technique, consistency',
      days: [
        {
          date: '2026-03-23', dayOfWeek: 'Monday', duration: '35 min', type: 'bwo',
          typeLabel: 'BWO Day', title: 'Walkover Form',
          drills: [
            { text: 'Warm-up: 3 min jumping jacks + arm circles' },
            { text: 'Standing backbend — 5 reps (focus on straight arms)' },
            { text: 'Back walkover — 5 reps (focus on locked legs)', surface: 'Tumble Mat' },
            { text: 'Back walkover slow-motion — 3 reps', surface: 'Tumble Mat' },
            { text: 'Hollow body hold — 30 sec x 3' },
            { text: 'Shoulder flexibility work — 5 min' },
            { text: 'Splits — 1 min each side + center' },
          ],
        },
        {
          date: '2026-03-24', dayOfWeek: 'Tuesday', duration: '35 min', type: 'ro',
          typeLabel: 'RO Day', title: 'Round-off Rebound',
          drills: [
            { text: 'Warm-up: 3 min running + high knees' },
            { text: 'Round-off — 10 reps (focus on two-feet landing)', surface: 'Tumble Mat' },
            { text: 'Round-off rebound to tuck jump — 5 reps', surface: 'Tumble Mat' },
            { text: 'Round-off step-out vs snap-down — 5 each', surface: 'Tumble Mat' },
            { text: 'Handstand hold — 30 sec x 3' },
            { text: 'Core: V-ups — 15 x 3' },
          ],
        },
        {
          date: '2026-03-25', dayOfWeek: 'Wednesday', duration: '15 min', type: 'rest',
          typeLabel: 'REST', title: 'Light stretch',
          drills: [
            { text: 'Full body stretch — 10 min' },
            { text: 'Foam roll — 5 min' },
          ],
        },
        {
          date: '2026-03-26', dayOfWeek: 'Thursday', duration: '40 min', type: 'full',
          typeLabel: 'FULL', title: 'Combo Sequences',
          drills: [
            { text: 'Warm-up: 3 min running + jumping jacks' },
            { text: 'Back walkover — 5 reps', surface: 'Tumble Mat' },
            { text: 'Round-off rebound — 5 reps', surface: 'Tumble Mat' },
            { text: 'Back walkover → round-off combo — 3 attempts', surface: 'Tumble Mat' },
            { text: 'Standing tuck drill — 5 reps', surface: 'Cheese Mat' },
            { text: 'Handstand to bridge — 5 reps', surface: 'Tumble Mat' },
            { text: 'Core circuit: hollow body, superman, V-ups, plank — 15 each' },
          ],
        },
        {
          date: '2026-03-27', dayOfWeek: 'Friday', duration: '35 min', type: 'bwo',
          typeLabel: 'BWO Day', title: 'Walkover Reps',
          drills: [
            { text: 'Warm-up: 3 min jumping jacks' },
            { text: 'Back walkover x 8 reps', surface: 'Tumble Mat' },
            { text: 'Standing backbend — 5 reps' },
            { text: 'Bridge kickover for speed — 5 reps', surface: 'Tumble Mat' },
            { text: 'Splits — 1 min each side' },
            { text: 'Hollow body hold — 30 sec x 3' },
          ],
        },
        {
          date: '2026-03-28', dayOfWeek: 'Saturday', duration: '90 min', type: 'gym',
          typeLabel: 'GYM', title: 'Team practice at gym',
          drills: [{ text: 'Team practice — stunts, routine, tumbling' }],
        },
        {
          date: '2026-03-29', dayOfWeek: 'Sunday', duration: '15 min', type: 'rest',
          typeLabel: 'REST', title: 'Light stretch',
          drills: [
            { text: 'Full body stretch — 10 min' },
            { text: 'Foam roll — 5 min' },
          ],
        },
      ],
    },
    {
      weekNumber: 7,
      title: 'CONSISTENCY',
      dateRange: 'Mar 30 – Apr 5',
      focus: 'Rep count up, confidence building',
      days: [
        {
          date: '2026-03-30', dayOfWeek: 'Monday', duration: '35 min', type: 'bwo',
          typeLabel: 'BWO Day', title: 'Walkover Reps x10',
          drills: [
            { text: 'Warm-up: 3 min jumping jacks + arm circles' },
            { text: 'Back walkover x 10 reps', surface: 'Tumble Mat' },
            { text: 'Standing backbend — 5 reps' },
            { text: 'Bridge kickover — 5 reps', surface: 'Tumble Mat' },
            { text: 'Splits — 1 min each side + center' },
            { text: 'Hollow body hold — 35 sec x 3' },
          ],
        },
        {
          date: '2026-03-31', dayOfWeek: 'Tuesday', duration: '35 min', type: 'ro',
          typeLabel: 'RO Day', title: 'Round-off Series',
          drills: [
            { text: 'Warm-up: 3 min running + high knees' },
            { text: 'Round-off x 10 reps', surface: 'Tumble Mat' },
            { text: 'Round-off rebound to tuck jump — 5 reps', surface: 'Tumble Mat' },
            { text: 'Round-off series (2 in a row) — 5 sets', surface: 'Tumble Mat' },
            { text: 'Handstand hold — 30 sec x 3' },
            { text: 'Core: V-ups — 20 x 3' },
          ],
        },
        {
          date: '2026-04-01', dayOfWeek: 'Wednesday', duration: '15 min', type: 'rest',
          typeLabel: 'REST', title: 'Light stretch',
          drills: [
            { text: 'Full body stretch — 10 min' },
            { text: 'Wrist and ankle mobility — 5 min' },
          ],
        },
        {
          date: '2026-04-02', dayOfWeek: 'Thursday', duration: '40 min', type: 'full',
          typeLabel: 'FULL', title: 'Full Run',
          drills: [
            { text: 'Warm-up: 3 min running + jumping jacks' },
            { text: 'Back walkover x 8 reps', surface: 'Tumble Mat' },
            { text: 'Round-off rebound x 8 reps', surface: 'Tumble Mat' },
            { text: 'Combo: walkover → round-off — 3 reps', surface: 'Tumble Mat' },
            { text: 'Handstand to bridge — 5 reps', surface: 'Tumble Mat' },
            { text: 'Tuck jumps — 10 x 3' },
            { text: 'Core circuit x 2: 15 of each exercise' },
          ],
        },
        {
          date: '2026-04-03', dayOfWeek: 'Friday', duration: '35 min', type: 'bwo',
          typeLabel: 'BWO Day', title: 'Walkover Confidence',
          drills: [
            { text: 'Warm-up: 3 min jumping jacks' },
            { text: 'Back walkover x 10 reps (no pausing)', surface: 'Tumble Mat' },
            { text: 'Back walkover on grass — 3 attempts', surface: 'Grass' },
            { text: 'Standing backbend — 5 reps' },
            { text: 'Splits — 1 min each' },
            { text: 'Cool-down stretch — 5 min' },
          ],
        },
        {
          date: '2026-04-04', dayOfWeek: 'Saturday', duration: '90 min', type: 'gym',
          typeLabel: 'GYM', title: 'Team practice at gym',
          drills: [{ text: 'Team practice — stunts, routine, tumbling' }],
        },
        {
          date: '2026-04-05', dayOfWeek: 'Sunday', duration: '15 min', type: 'rest',
          typeLabel: 'REST', title: 'Light stretch + journal',
          drills: [
            { text: 'Full body stretch — 10 min' },
            { text: 'Journal: are you ready for showcase week?' },
          ],
        },
      ],
    },
    {
      weekNumber: 8,
      title: 'SHOWCASE READY',
      dateRange: 'Apr 6 – Apr 12',
      focus: 'Performance prep, clean reps, celebrate!',
      days: [
        {
          date: '2026-04-06', dayOfWeek: 'Monday', duration: '40 min', type: 'full',
          typeLabel: 'FULL', title: 'Full Run-through',
          drills: [
            { text: 'Warm-up: 3 min running + jumping jacks + arm circles' },
            { text: 'Back walkover x 10 reps', surface: 'Tumble Mat' },
            { text: 'Round-off rebound x 10 reps', surface: 'Tumble Mat' },
            { text: 'Combo: walkover → round-off — 5 reps', surface: 'Tumble Mat' },
            { text: 'Handstand hold — 30 sec x 3' },
            { text: 'Core circuit: 20 of each exercise' },
            { text: 'Splits — 1 min each side' },
          ],
        },
        {
          date: '2026-04-07', dayOfWeek: 'Tuesday', duration: '30 min', type: 'bwo',
          typeLabel: 'BWO Day', title: 'Polish Walkover',
          drills: [
            { text: 'Warm-up: 3 min jumping jacks' },
            { text: 'Back walkover x 8 reps (focus on pointed toes)', surface: 'Tumble Mat' },
            { text: 'Back walkover slow-motion — 3 reps', surface: 'Tumble Mat' },
            { text: 'Standing backbend — 5 reps' },
            { text: 'Splits — 1 min each side' },
            { text: 'Cool-down stretch — 5 min' },
          ],
        },
        {
          date: '2026-04-08', dayOfWeek: 'Wednesday', duration: '15 min', type: 'rest',
          typeLabel: 'REST', title: 'Light stretch',
          drills: [
            { text: 'Full body stretch — 10 min' },
            { text: 'Visualize your best skills — 5 min' },
          ],
        },
        {
          date: '2026-04-09', dayOfWeek: 'Thursday', duration: '30 min', type: 'ro',
          typeLabel: 'RO Day', title: 'Polish Round-off',
          drills: [
            { text: 'Warm-up: 3 min running' },
            { text: 'Round-off x 8 reps (focus on straight body)', surface: 'Tumble Mat' },
            { text: 'Round-off rebound — stick it — 5 reps', surface: 'Tumble Mat' },
            { text: 'Handstand snap-down — 5 reps', surface: 'Panel Mat' },
            { text: 'Core: V-ups — 15 x 3' },
            { text: 'Cool-down stretch — 5 min' },
          ],
        },
        {
          date: '2026-04-10', dayOfWeek: 'Friday', duration: '40 min', type: 'full',
          typeLabel: 'FULL', title: 'Final Run',
          drills: [
            { text: 'Warm-up: 3 min full warm-up' },
            { text: 'Back walkover x 10 — best form', surface: 'Tumble Mat' },
            { text: 'Round-off rebound x 10 — best form', surface: 'Tumble Mat' },
            { text: 'Full combo run — 5 reps', surface: 'Tumble Mat' },
            { text: 'Video yourself for progress check!' },
            { text: 'Full cool-down stretch — 10 min' },
          ],
        },
        {
          date: '2026-04-11', dayOfWeek: 'Saturday', duration: '90 min', type: 'gym',
          typeLabel: 'GYM', title: 'Showcase Day!',
          drills: [
            { text: 'Team practice — final showcase!' },
            { text: 'Show off your back walkover and round-off!' },
          ],
        },
        {
          date: '2026-04-12', dayOfWeek: 'Sunday', duration: '15 min', type: 'rest',
          typeLabel: 'REST', title: 'Celebrate!',
          drills: [
            { text: 'Light stretch — 10 min' },
            { text: 'Celebrate 8 weeks of hard work! You did it!' },
          ],
        },
      ],
    },
  ],
};

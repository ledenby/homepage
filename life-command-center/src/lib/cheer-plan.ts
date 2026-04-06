export interface CheerDrill {
  text: string;
  surface?: string;
  isMilestone?: boolean;
}

export interface CheerDayTemplate {
  dayOfWeek: string;
  label: string;
  type: 'bwo' | 'fwo' | 'combo' | 'rest' | 'gym' | 'fun';
  duration: string;
  drills: CheerDrill[];
}

export interface CheerPhase {
  phaseNumber: number;
  title: string;
  skill: string;
  moveOnWhen: string;
  days: CheerDayTemplate[];
  notes?: string[];
}

export interface GlossaryEntry {
  name: string;
  family: string;
  surfaces: string[];
  howTo: string[];
  looksRight: string[];
  watchFor: string[];
  youtube: string;
}

export interface MilestoneItem {
  phase: number;
  text: string;
}

export const cheerPlan = {
  name: 'Tumbling Mastery Plan',
  subtitle: '6 Skills \u2022 No Rush \u2022 Real Results',
  skills: [
    'Backbend (standing down to bridge)',
    'Back Walkover (backbend that flows into a kickover)',
    'Front Walkover (forward through handstand to bridge to stand)',
    'Round-Off (cartwheel with a snap-down ending)',
    'Cartwheel-Back Walkover (connecting two skills in one pass)',
    'Valdez (back walkover from a seated position)',
  ],
  weeklyStructure: [
    { day: 'Monday', desc: 'Back walkover track (15-20 min at home)' },
    { day: 'Tuesday', desc: 'Front walkover + round-off track (15-20 min at home)' },
    { day: 'Wednesday', desc: 'Combo day \u2014 whatever she\'s excited about (15 min at home)' },
    { day: 'Thursday', desc: 'Cheer practice (coached)' },
    { day: 'Friday', desc: 'Fun day \u2014 trampoline drills + anything she wants to show off (15 min)' },
    { day: 'Saturday', desc: 'Rest' },
    { day: 'Sunday', desc: 'Tumbling class (coached)' },
  ],
  equipment: ['Tumble Mat', 'Barrel', 'Cheese Mat', 'Trampoline'],
  phases: [
    {
      phaseNumber: 1,
      title: 'BACKBEND',
      skill: 'Standing down to a bridge. This IS the first half of the back walkover.',
      moveOnWhen: 'She can stand, arch backward, and place her hands on the floor in a bridge with straight arms \u2014 with only a fingertip guide from you.',
      notes: [
        '\u26A0\uFE0F Fear Management: Going backward is the #1 fear barrier. NEVER rush it. If she hesitates, go back to wall walk-downs. The trampoline helps because it feels like play, not training.',
      ],
      days: [
        {
          dayOfWeek: 'Monday', label: 'BWO Track', type: 'bwo' as const, duration: '15-20 min',
          drills: [
            { text: 'Bridge push-up from floor \u2014 hold 20 sec x 5' },
            { text: 'Bridge rocks \u2014 10 x 3 sets on tumble mat' },
            { text: 'Barrel back arch \u2014 drape over barrel, hands to floor, hold 10 sec x 5' },
            { text: 'Wall walk-down to bridge \u2014 5 reps (panel or tumble mat at base)' },
            { text: 'Wall walk back up \u2014 5 reps' },
            { text: 'Wall walk-down to the LOWEST point possible \u2014 try to get hands to floor' },
            { text: 'Spotted backbend to bridge \u2014 your hands on her back, guiding her down' },
            { text: 'Spotted backbend with fingertip guide only' },
          ],
        },
        {
          dayOfWeek: 'Tuesday', label: 'FWO + RO Track', type: 'fwo' as const, duration: '15-20 min',
          drills: [
            { text: 'Line cartwheels \u2014 10 reps on grass (tape or rope)' },
            { text: 'Handstand against wall \u2014 hold 20 sec x 3' },
            { text: 'Front limber attempts on barrel \u2014 kick to handstand, arch over barrel, land feet together x 5' },
          ],
        },
        {
          dayOfWeek: 'Wednesday', label: 'Combo / Her Choice', type: 'combo' as const, duration: '15 min',
          drills: [
            { text: 'Whatever she\'s working on that she\'s excited about' },
            { text: 'Mix of her best drills + 2-3 attempts at her hardest current skill' },
          ],
        },
        {
          dayOfWeek: 'Friday', label: 'Trampoline + Fun', type: 'fun' as const, duration: '15 min',
          drills: [
            { text: 'Backbend on trampoline \u2014 the bounce makes going backward less scary' },
            { text: 'Handstands on trampoline' },
            { text: 'Backward roll on trampoline' },
            { text: 'Whatever she wants to show off' },
          ],
        },
      ],
    },
    {
      phaseNumber: 2,
      title: 'BACK WALKOVER',
      skill: 'A backbend that flows directly into a kickover without stopping. The signature Level 1 skill.',
      moveOnWhen: 'She can do an independent BWO on the tumble mat \u2014 3 in a row, no spot, straight arms, clean finish.',
      days: [
        {
          dayOfWeek: 'Monday', label: 'BWO Track', type: 'bwo' as const, duration: '15-20 min',
          drills: [
            { text: 'Barrel-assisted kickover \u2014 drape over barrel, kick over x 5' },
            { text: 'Cheese mat kickover \u2014 elevated bridge kickover x 5' },
            { text: 'Flat bridge kickover on tumble mat x 10' },
            { text: '5 flat bridge kickovers in a row', isMilestone: true },
            { text: 'Wall walk-down + immediate kickover (no pause in bridge) x 5' },
            { text: 'Spotted backbend + immediate kickover (full spot) x 5' },
            { text: 'Spotted BWO \u2014 fingertip guide x 5' },
            { text: 'Spotted BWO \u2014 hovering hands (no touch) x 3' },
            { text: 'SOLO BWO on tumble mat x 3' },
            { text: 'Solo BWO on grass x 3' },
            { text: '3 clean BWOs on tumble mat, no spot', isMilestone: true },
          ],
        },
        {
          dayOfWeek: 'Tuesday', label: 'FWO + RO Track', type: 'fwo' as const, duration: '15-20 min',
          drills: [
            { text: 'Cartwheels \u2014 split at the top, pointed toes' },
            { text: 'T-Cartwheels (hands turned sideways) \u2014 round-off hand placement' },
            { text: 'Handstand kick-ups against wall' },
            { text: 'Front limber on barrel \u2192 then on tumble mat' },
          ],
        },
        {
          dayOfWeek: 'Friday', label: 'Trampoline + Fun', type: 'fun' as const, duration: '15 min',
          drills: [
            { text: 'BWO on trampoline \u2014 the bounce makes it so much easier' },
            { text: 'Back walkover attempts on trampoline for confidence reps' },
            { text: 'Handstand snap-down on trampoline (round-off prep)' },
          ],
        },
      ],
    },
    {
      phaseNumber: 3,
      title: 'FRONT WALKOVER + ROUND-OFF',
      skill: 'Now she has a BWO. These two skills work in parallel \u2014 front walkover on Mondays, round-off on Tuesdays.',
      moveOnWhen: 'Independent front walkover on tumble mat AND clean round-off with rebound on grass.',
      days: [
        {
          dayOfWeek: 'Monday', label: 'Front Walkover Track', type: 'bwo' as const, duration: '15-20 min',
          drills: [
            { text: 'BWO warm-up \u2014 5 reps' },
            { text: 'Front limber on barrel \u2014 kick to handstand, arch over, land both feet x 5' },
            { text: 'Front limber on tumble mat (no barrel) x 5' },
            { text: 'Front walkover \u2014 split the legs, lead foot lands first x 5' },
            { text: 'Push hips forward to stand up without hands touching the ground' },
            { text: '3 clean front walkovers on tumble mat', isMilestone: true },
          ],
        },
        {
          dayOfWeek: 'Tuesday', label: 'Round-Off Track', type: 'fwo' as const, duration: '15-20 min',
          drills: [
            { text: 'Hurdle drill \u2014 2-3 running steps into a powerful skip-lunge x 10 on grass' },
            { text: 'T-Cartwheel \u2014 cartwheel with hands turned sideways x 10 on grass' },
            { text: 'Snap-down from handstand \u2014 BOTH feet hit ground at same time x 10 on tumble mat' },
            { text: 'Snap-down on cheese mat \u2014 incline helps feel the snap x 5' },
            { text: 'Full round-off on grass \u2014 hurdle + turned hands + snap-down x 5' },
            { text: 'Round-off + rebound finish (bounce up, arms overhead) x 5' },
            { text: '3 clean round-offs in a row, straight line, feet together, rebound', isMilestone: true },
          ],
        },
        {
          dayOfWeek: 'Friday', label: 'Trampoline + Fun', type: 'fun' as const, duration: '15 min',
          drills: [
            { text: 'Front walkover on trampoline' },
            { text: 'Round-off on trampoline (the bounce amplifies the snap-down feel)' },
            { text: 'BWO reps on trampoline for maintenance' },
          ],
        },
      ],
    },
    {
      phaseNumber: 4,
      title: 'CARTWHEEL-BACK WALKOVER',
      skill: 'Connecting two skills into one tumbling pass. A Level 1 cheer combination that shows coordination and flow.',
      moveOnWhen: 'Smooth cartwheel-BWO with no pause or extra steps between skills.',
      notes: [
        '\uD83D\uDCA1 Which Leg?: The leg that lands SECOND in the cartwheel becomes the leg that lifts FIRST in the BWO. If she cartwheels right, her left leg lands last and kicks into the BWO. This should feel natural \u2014 don\'t overthink it.',
      ],
      days: [
        {
          dayOfWeek: 'Monday', label: 'Combo Track', type: 'bwo' as const, duration: '15-20 min',
          drills: [
            { text: 'Cartwheel to lunge, pause, then BWO \u2014 getting used to the sequence x 5' },
            { text: 'Cartwheel to BWO with shorter pause x 5' },
            { text: 'Cartwheel to BWO \u2014 no pause, one continuous motion x 5' },
            { text: 'Cartwheel-BWO on tumble mat x 5' },
            { text: 'Cartwheel-BWO on grass x 3' },
            { text: '3 smooth cartwheel-BWOs with no stop between skills', isMilestone: true },
          ],
        },
        {
          dayOfWeek: 'Tuesday', label: 'Bonus Combos', type: 'fwo' as const, duration: '15-20 min',
          drills: [
            { text: 'Front walkover-cartwheel combo (another Level 1 pass)' },
            { text: 'BWO-BWO (back walkover switch leg \u2014 two in a row)' },
          ],
        },
      ],
    },
    {
      phaseNumber: 5,
      title: 'VALDEZ',
      skill: 'A back walkover that starts from a SITTING position. The coolest skill on this list. Also the hardest.',
      moveOnWhen: 'Clean Valdez on tumble mat \u2014 push up from seated, arch back, full walkover, stand.',
      notes: [
        '\uD83C\uDFAF Realistic Timeline: The Valdez is an end-of-year goal. She needs a rock-solid BWO first. Once she has that, the Valdez progression takes 4-8 weeks of focused work. Don\'t introduce it until Phases 1-3 are complete.',
      ],
      days: [
        {
          dayOfWeek: 'Monday', label: 'Valdez Track', type: 'bwo' as const, duration: '20-25 min',
          drills: [
            { text: 'Seated bridge \u2014 from sitting, push hips up to a bridge position x 5' },
            { text: 'Seated bridge on cheese mat (incline helps hips rise) x 5' },
            { text: 'Seated bridge + kickover from cheese mat x 5' },
            { text: 'One-leg seated push-up drill \u2014 sit, one leg bent, push hips as HIGH as possible x 10 each side' },
            { text: 'Elevated Valdez \u2014 sit on a raised surface (stack of mats, couch edge), go back into BWO x 5' },
            { text: 'Spotted Valdez on floor \u2014 support her lower back as she pushes up and arches back x 5' },
            { text: 'BWO from high front scale (leg held high before going back) \u2014 this trains the Valdez timing x 5' },
            { text: 'Solo Valdez on tumble mat x 3' },
            { text: 'Clean Valdez on tumble mat', isMilestone: true },
          ],
        },
      ],
    },
  ] as CheerPhase[],
  milestones: [
    { phase: 1, text: 'Bridge from floor \u2014 straight arms, 20 sec hold' },
    { phase: 1, text: 'Bridge rocks \u2014 shoulders past wrists' },
    { phase: 1, text: 'Barrel back arch \u2014 hands flat on floor, comfortable' },
    { phase: 1, text: 'Wall walk-down \u2014 hands reach the floor' },
    { phase: 1, text: 'Wall walk-up \u2014 back to standing' },
    { phase: 1, text: 'BACKBEND with fingertip spot \u2014 standing to bridge' },
    { phase: 2, text: 'Barrel kickover x 5' },
    { phase: 2, text: 'Cheese mat kickover x 5' },
    { phase: 2, text: 'Flat bridge kickover x 5 in a row' },
    { phase: 2, text: 'Wall walk-down + kickover combo' },
    { phase: 2, text: 'Spotted BWO \u2014 full spot' },
    { phase: 2, text: 'Spotted BWO \u2014 fingertip guide' },
    { phase: 2, text: 'Spotted BWO \u2014 hovering hands' },
    { phase: 2, text: 'SOLO BWO on tumble mat x 3 in a row' },
    { phase: 2, text: 'Solo BWO on grass' },
    { phase: 3, text: 'Front limber on barrel' },
    { phase: 3, text: 'Front limber on tumble mat' },
    { phase: 3, text: 'Front walkover on tumble mat x 3' },
    { phase: 3, text: 'Hurdle drill \u2014 powerful and consistent' },
    { phase: 3, text: 'T-Cartwheel \u2014 hands turned' },
    { phase: 3, text: 'Snap-down \u2014 both feet together' },
    { phase: 3, text: 'Full round-off \u2014 straight line, rebound x 3' },
    { phase: 4, text: 'Cartwheel + pause + BWO' },
    { phase: 4, text: 'Cartwheel-BWO \u2014 shorter pause' },
    { phase: 4, text: 'CARTWHEEL-BWO \u2014 no pause, continuous' },
    { phase: 4, text: 'Cartwheel-BWO on grass' },
    { phase: 5, text: 'Seated bridge \u2014 hips high' },
    { phase: 5, text: 'Seated bridge + kickover from cheese mat' },
    { phase: 5, text: 'Elevated Valdez from raised surface' },
    { phase: 5, text: 'Spotted Valdez on floor' },
    { phase: 5, text: 'BWO from high front scale' },
    { phase: 5, text: 'SOLO VALDEZ on tumble mat' },
  ] as MilestoneItem[],
};

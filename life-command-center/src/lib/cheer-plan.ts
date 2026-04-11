export interface DrillBlock {
  name: string;
  time: string;
  detail: string;
}

export interface TrainingDay {
  name: string;
  focus: string;
  time: string;
  blocks: DrillBlock[];
}

export interface DevWeek {
  range: string;
  title: string;
  sessions: string;
  goal: string;
  drills: string[];
  checkpoint: string;
}

export interface Milestone {
  skill: string;
  status: string;
  competition: string;
  icon: string;
}

export interface EngagementRule {
  rule: string;
  detail: string;
  icon: string;
}

export const TRYOUT_PHASE = {
  label: 'Phase 1',
  title: 'Tryout Optimization',
  duration: '2 Weeks',
  icon: '⚡',
  philosophy:
    "Don't chase new skills. Make everything she has look competition-clean while signaling stunt readiness and coachability.",
  days: [
    {
      name: 'Days 1 & 3',
      focus: 'Technique Polish + Presentation',
      time: '35 min',
      blocks: [
        {
          name: 'Warm-Up Game',
          time: '5 min',
          detail:
            'Shipwreck or Freeze Dance — skip, gallop, bear crawl, crab walk. Change commands every 15–20 sec.',
        },
        {
          name: 'Dynamic Flexibility',
          time: '5 min',
          detail:
            'Leg swings (10/leg), arm circles → overhead reaches, walking lunges with arms up, inchworms across floor.',
        },
        {
          name: 'Cartwheel Block',
          time: '8 min',
          detail:
            '3 cartwheels/round with one cue each: (1) point toes hard, (2) lock legs like steel, (3) finish in perfect lunge. Then cartwheel challenge on a line.',
        },
        {
          name: 'Bridge + Body Tension',
          time: '7 min',
          detail:
            "3 bridge push-ups with 5-sec holds. 2 one-leg bridges (15 sec each). 20-sec hollow body → 20-sec superman → 20-sec plank. Frame as 'Gymnastics Shapes Challenge.'",
        },
        {
          name: 'Performance Practice',
          time: '5 min',
          detail:
            'Perform cartwheel + forward roll like judges are watching. Cue smile, eye contact, sharp arms, pointed toes. Build a mini routine: 3 cartwheels + roll in sequence.',
        },
        {
          name: 'Flexibility Cooldown',
          time: '5 min',
          detail:
            'Seated straddle, butterfly, kneeling lunge (30 sec/side), arms-overhead shoulder stretch, prayer stretch.',
        },
      ],
    },
    {
      name: 'Days 2 & 4',
      focus: 'Strength Foundation + Round-Off Intro',
      time: '35 min',
      blocks: [
        {
          name: 'Warm-Up Game',
          time: '5 min',
          detail:
            'Obstacle course relay: forward roll, jump block, bear walk, wall handstand 5 sec, crab walk back. Race her own time.',
        },
        {
          name: 'Wrist + Shoulder',
          time: '5 min',
          detail:
            'Palm-flat kneeling rocks (10), back-of-hand rocks (8), fist rocks (8), wrist circles (10 each). Wall slides for shoulders (10 reps). Non-negotiable for her size.',
        },
        {
          name: 'Round-Off Intro',
          time: '8 min',
          detail:
            "Power hurdle lunge drill (10 reps). Needle kicks from lunge (5/leg). Handstand snap-down ('superhero landing'). 2–3 slow round-offs on line — form only, no power.",
        },
        {
          name: 'Strength Circuit',
          time: '8 min',
          detail:
            "'Boot Camp' stations rotating 60 sec: wall handstand, hollow rocks, squat jumps, bridge with shoulder rocks, single-leg balance eyes closed. Music on. 3 rounds.",
        },
        {
          name: 'Skill Integration',
          time: '4 min',
          detail:
            'Full tryout sim: best cartwheel → forward roll → round-off attempt. Coach gives 1 correction. Run again with fix applied. Practices coachability.',
        },
        {
          name: 'Flexibility Cooldown',
          time: '5 min',
          detail:
            'Same as Days 1/3. Add prone shoulder press (20 sec). Kneeling lunge with overhead arm (opens anterior chain).',
        },
      ],
    },
    {
      name: 'Day 5',
      focus: 'Fun Day + Mock Tryout',
      time: '40 min',
      blocks: [
        {
          name: 'Game Warm-Up',
          time: '7 min',
          detail:
            'Skill Memory Add-On: start with forward roll, add cartwheel, add jump — building a sequence she must remember and perform each round.',
        },
        {
          name: 'Mock Tryout',
          time: '15 min',
          detail:
            'Full simulation: tumbling eval, jump eval (tuck jump + straight jump), 8-count choreo learned on the spot, coachability test (3 corrections → check application).',
        },
        {
          name: 'Flexibility + Bridge',
          time: '8 min',
          detail:
            "Full splits both sides + center, bridge holds → bridge rocks, wall walk-downs ('spider training'). This is Phase 2 prep disguised as Phase 1 flexibility.",
        },
        {
          name: 'Free Choice + Cooldown',
          time: '10 min',
          detail:
            "She picks her favorite drill or game from the week. Positive reinforcement. Static stretching. Talk about what she's proud of.",
        },
      ],
    },
  ] as TrainingDay[],
};

export const DEV_PHASE = {
  label: 'Phase 2',
  title: 'Skill Development',
  duration: 'Weeks 3–10',
  icon: '🚀',
  philosophy:
    "Now we build. Progress is gated by readiness — no stage advances until checkpoints are met. Her height means she stays on elevated surfaces longer, and that's by design.",
  weeks: [
    {
      range: 'Weeks 3–4',
      title: 'Foundation Lock-In',
      sessions: '4x/week',
      goal: 'Bulletproof bridge mechanics + begin elevated kickover',
      drills: [
        'Bridge push-ups × 5 with 5-sec holds, bridge rocks × 8, one-leg bridge holds × 15 sec each',
        'Elevated kickover: feet on 24–36" surface, coach spots. 3–5 attempts/session. Keep surface high for success every time',
        'Strength: wall handstand holds → 30 sec, hollow body → 30 sec, 10 squat jumps, 10 leg lifts/side',
        'Flexibility: shoulder work (elbow bridges, prone presses, wall slides), hip flexor stretches, splits both sides',
      ],
      checkpoint:
        'Bridge hold 30 sec with straight arms. Bridge rocks show shoulder shift past hands. One-leg bridge free leg past 45°. 3 successful spotted kickovers from elevation.',
    },
    {
      range: 'Weeks 5–6',
      title: 'Kickover Progression + Front Walkover Prep',
      sessions: '4–5x/week',
      goal: 'Reduce kickover elevation toward floor; begin handstand & front limber',
      drills: [
        'Systematically lower surface: large box → small box → stacked panel mats. 3 clean kickovers at each height before progressing',
        'Front walkover prep: wall handstand kick-ups, handstand → bridge lower, handstand → bridge → stand-up sequence',
        'Round-off: 2–3 per session. Hurdle entry, hand placement, 2-foot landing, controlled rebound',
        'Strength: pike push-ups, active split holds (standing, lift leg to max, hold 10 sec/side)',
      ],
      checkpoint:
        'Consistent kickovers from panel mat height (~8–12") with minimal spot. Beginning floor-level kickover with spot. Wall handstand 20+ sec.',
    },
    {
      range: 'Weeks 7–8',
      title: 'Floor Kickover + Standing Backbend',
      sessions: '5x/week',
      goal: 'Floor bridge kickover; wall walk-downs to bridge; first spotted front walkovers',
      drills: [
        'Floor kickover: from single panel mat → floor. Coach spots at lower back. If blocked, identify cause (shoulder push vs tight splits)',
        'Standing backbend: wall walk-downs (start close, increase distance). Spotted backbends. Confidence ladder: walk-down → hands to floor → spotted → decreasing spot',
        'Front walkover: from elevated surface, kick through handstand, arch over, land one foot at a time. Spot at hips',
        'Conditioning: hollow body 30 sec, bridge push-ups × 5, wall handstand 30 sec, banded leg lifts 10/side',
      ],
      checkpoint:
        'Floor bridge kickover with light spot or independent. Wall walk-down with hands to floor. At least 1 spotted standing backbend. Front limber consistent.',
    },
    {
      range: 'Weeks 9–10',
      title: 'Back Walkover + Connections',
      sessions: '5x/week',
      goal: 'First spotted back walkovers; front walkover independence; cartwheel → BWO connection',
      drills: [
        'Back walkover: full spotted attempts. Cues: lead leg kicks straight, split wide, ride the arc, finish tall in lunge. Reduce to fingertip → hover spot',
        'Front walkover: working toward unassisted from floor. Focus on foot placement close to hands and hip drive forward',
        'Connection work: cartwheel → pause in lunge → back walkover (spotted). Pause decreases over sessions',
        'Round-off consistency: 3–5/session. Hurdle + 2-foot landing should be locked in. Work on rebound quality',
      ],
      checkpoint:
        'Spotted back walkover with decreasing assistance. Front walkover independent or near-independent. Round-off consistent with clean form.',
    },
  ] as DevWeek[],
};

export const MILESTONES: Milestone[] = [
  {
    skill: 'Bridge kickover (floor)',
    status: 'Independent or light spot',
    competition: 'Can be added to routine',
    icon: '🌉',
  },
  {
    skill: 'Standing backbend',
    status: 'Consistent with decreasing spot',
    competition: 'Not yet comp-ready',
    icon: '🔙',
  },
  {
    skill: 'Standing back walkover',
    status: 'Spotted, possibly light-spot',
    competition: 'Mid-season addition',
    icon: '⭐',
  },
  {
    skill: 'Front walkover',
    status: 'Independent or light spot',
    competition: 'Possible routine addition',
    icon: '🌟',
  },
  {
    skill: 'Round-off',
    status: 'Consistent with clean form',
    competition: 'Comp-ready by week 8–10',
    icon: '🔄',
  },
  {
    skill: 'Cartwheel → BWO',
    status: 'Beginning with spot',
    competition: 'Late-season goal',
    icon: '🔗',
  },
  {
    skill: 'Valdez',
    status: 'Preliminary drills only',
    competition: 'Not this season',
    icon: '💫',
  },
];

export const TRYOUT_TIPS = {
  showcase: [
    'Beautiful cartwheels on a line — pointed toes, locked legs, confident lunge finish',
    'Strong held bridge (shows flexibility + strength visually)',
    'Controlled forward roll with tight tuck and clean stand-up',
    'Round-off only if controlled — a shaky one hurts more than skipping it',
    'Sharp arm motions, genuine energy, immediate correction application',
  ],
  between: [
    'Apply every correction immediately (strongest coachability signal)',
    'Eye contact with evaluators',
    'Encourage other athletes genuinely',
    'Maintain energy even as others fatigue',
    'Willingness to try any stunt position',
  ],
  avoid: [
    'Attempting unmastered skills (sloppy BWO attempt < no attempt)',
    'Showing fear — say "I\'m working on that" with confidence',
    'Losing energy between stations',
  ],
};

export const ENGAGEMENT: EngagementRule[] = [
  {
    rule: '5-Minute Rotation',
    detail:
      'No drill exceeds 5–8 min. When attention drops, change activity immediately.',
    icon: '🔄',
  },
  {
    rule: 'Game Framing',
    detail:
      'Hollow holds = astronaut training. Wall handstands = spider walks. Wrist conditioning = ninja hand exercises.',
    icon: '🎮',
  },
  {
    rule: 'Self-Competition',
    detail:
      'Time her planks, count consecutive cartwheels, track personal records on a visible chart.',
    icon: '🏆',
  },
  {
    rule: 'Music Always',
    detail:
      'Let her choose the playlist. Music during conditioning increases effort and enjoyment.',
    icon: '🎵',
  },
  {
    rule: 'Choice Principle',
    detail:
      '"Bridges first or cartwheels first?" Perceived autonomy increases engagement.',
    icon: '🎯',
  },
  {
    rule: 'End on a High',
    detail:
      'Final 5 min is always her favorite activity. Positive memory = eagerness to return.',
    icon: '✨',
  },
];

export const HEIGHT_TIPS = [
  'Stay on elevated surfaces longer in all kickover progressions — longer levers make floor-level skills proportionally harder',
  'Wrist conditioning every session, non-negotiable — growth plate injuries are most likely during rapid growth',
  'Allow slightly wider hand/foot placement during learning phases',
  "Don't compare her timeline with smaller peers — same skill may take 2–3× longer but technique will be stronger",
  'Emphasize shoulder + core conditioning before introducing new weight-bearing skills',
];

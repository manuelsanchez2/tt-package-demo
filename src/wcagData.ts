export const wcagCriteria: {
  [key: string]: {
    title: string;
    description: string;
    link: string;
    background: string;
    principle: string;
    level: string;
  };
} = {
  '1.1.1': {
    title: 'Non-text Content',
    description: 'Provide text alternatives for any non-text content.',
    link: 'https://www.w3.org/WAI/WCAG22/Understanding/non-text-content',
    background: '#B60000',
    principle: 'Perceivable',
    level: 'A',
  },
  '1.2.1': {
    title: 'Audio-only and Video-only (Prerecorded)',
    description: 'Provide an alternative for time-based media.',
    link: 'https://www.w3.org/WAI/WCAG22/Understanding/audio-only-and-video-only-prerecorded',
    background: '#B60000',
    principle: 'Perceivable',
    level: 'A',
  },
  '2.1.1': {
    title: 'Keyboard',
    description: 'Make all functionality available from a keyboard.',
    link: 'https://www.w3.org/WAI/WCAG22/Understanding/keyboard',
    background: '#1651A9',
    principle: 'Operable',
    level: 'A',
  },
  '2.1.3': {
    title: 'Keyboard (No Exception)',
    description:
      'Make all functionality available from a keyboard without exception.',
    link: 'https://www.w3.org/WAI/WCAG22/Understanding/keyboard-no-exception',
    background: '#1651A9',
    principle: 'Operable',
    level: 'AAA',
  },
  // Add more WCAG criteria as needed
};

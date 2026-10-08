/** The home page's "What I'm up to" block. Update the date with the content. */
export const now = {
  updated: '2026-10-08',
  /** Project ids, linked to their case study or their live site. */
  building: ['myna', 'remora', 'games', 'bucket-list'],
  learning: { en: 'AI and machine learning', fr: 'L’IA et le machine learning' },
  /**
   * What the current position covers, shown in the hero after the title. Taken from the
   * resume's first highlight; shown only while the resume's current employer is `company`.
   */
  scope: {
    company: 'Heropay',
    en: 'line manager of up to 9 engineers',
    fr: 'manager de 9 ingénieurs au plus fort de l’équipe',
  },
} as const;

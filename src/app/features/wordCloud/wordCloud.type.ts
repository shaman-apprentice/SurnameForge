/** Key is word and value is frequency of occurrence of word */
export type Words = Map<string, number>

/**
 * Should be sorted decreasing in size and ensured,
 * that every item.size is not bigger than 150% of its siblings
 */
export type WordCloudWords = Array<{ 
  /** word to be rendered */
  text: string;
  /** used as fontSize */
  size: number;
}>

export type Size = {
  width: number;
  height: number;
}

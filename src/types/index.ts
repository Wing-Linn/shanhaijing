export interface Chapter {
  id: number;
  title: string;
  category: 'mountain' | 'sea' | 'wilderness' | 'within-sea';
  categoryLabel: string;
  description: string;
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  content: string;
  creatures?: Creature[];
  mountains?: Mountain[];
}

export interface Creature {
  id: string;
  name: string;
  description: string;
  appearance: string;
  abilities: string;
  location: string;
  omen: string;
  chapterId: number;
  chapterTitle: string;
}

export interface Mountain {
  id: string;
  name: string;
  description: string;
  resources: string[];
  chapterId: number;
  chapterTitle: string;
}

export type ViewType = 'home' | 'chapters' | 'creatures' | 'mountains' | 'search' | 'reader';

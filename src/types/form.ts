type TCoworker = {
  [name: string]: {
    id: number;
    sex: string;
  };
};

type TFilter = {
  [sex: string]: {
    name: string;
    id: number;
  };
};

export type { TCoworker, TFilter };

import { create } from 'zustand';
import { motionValue, type MotionValue } from 'framer-motion';

type Store = {
  rotation: MotionValue<number>;
};

export const useStore = create<Store>(() => ({
  rotation: motionValue(0) as MotionValue<number>,
}));

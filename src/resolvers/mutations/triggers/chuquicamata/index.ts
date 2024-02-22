import { sources } from './sources';

const triggerChuquicamata = async () => {
  const results = await Promise.all(sources.map((source) => source()));
  return results.flat();
};

export { triggerChuquicamata };

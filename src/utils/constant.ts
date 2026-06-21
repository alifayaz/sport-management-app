import { SportType, sportNameFa, ArenaType } from '@/types/schemas';
export function getSportNameFa(type: SportType): string {
  return sportNameFa[type];
}

export function getArenaTypeFa(type: ArenaType): string {
  const map: Record<ArenaType, string> = {
    outdoor: 'فضای باز',
    indoor: 'سرپوشیده',
  };

  return map[type];
}

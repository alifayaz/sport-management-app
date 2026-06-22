import { SportType, sportNameFa, ArenaType } from '@/types/schemas';

export const PRIMARY = '#1E5A99';

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

export const getDuration = (start: string, end: string) => {
  const diff = new Date(end).getTime() - new Date(start).getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const remain = minutes % 60;

  return hours > 0 ? `${hours} ساعت و ${remain} دقیقه` : `${remain} دقیقه`;
};

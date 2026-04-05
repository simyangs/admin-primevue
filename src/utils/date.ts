/**
 * 8자리 숫자 문자열을 Date 객체로 변환
 */
export const parseNumericToDate = (value: string): Date | null => {
  const nums = value.replace(/\D/g, '');
  if (nums.length === 8) {
    const year = parseInt(nums.slice(0, 4));
    const month = parseInt(nums.slice(4, 6)) - 1; // 월은 0부터 시작
    const day = parseInt(nums.slice(6, 8));
    const date = new Date(year, month, day);

    // 유효한 날짜인지 확인
    return isNaN(date.getTime()) ? null : date;
  }
  return null;
};

export const stringToDate = (str: string | null) => {
  if (!str) return null;
  str = str.replace(/[^0-9]/g, '');
  if (str.length !== 8) return null;

  const y = str.substring(0, 4);
  const m = str.substring(4, 6);
  const d = str.substring(6, 8);

  return new Date(`${y}-${m}-${d}`);
};

export const toNumericStr = (d: Date) => {
  if (!d) return '';
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
};

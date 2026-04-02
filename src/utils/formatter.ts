/**
 * 천원단위 콤마 입력
 */
export const formatNumber = (val: string | number): string => {
  if (typeof val == 'string') val = Number(val);
  return new Intl.NumberFormat('ko-KR').format(val);
};

/**
 * 숫자만 입력받아 날짜 형식(YYYY-MM-DD)으로 변환
 */
export const formatNumericToDateString = (value: string): string => {
  const nums = value.replace(/\D/g, '');

  if (nums.length <= 4) return nums;
  if (nums.length <= 6) return `${nums.slice(0, 4)}-${nums.slice(4)}`;
  return `${nums.slice(0, 4)}-${nums.slice(4, 6)}-${nums.slice(6, 8)}`;
};

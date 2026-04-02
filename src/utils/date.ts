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

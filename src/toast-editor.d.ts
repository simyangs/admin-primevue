declare module '@toast-ui/editor' {
  // 실제 파일 시스템 경로를 직접 지정하여 타입을 강제로 연결합니다.
  import { Editor } from '@toast-ui/editor/types/index';
  export default Editor;
}

declare module '@toast-ui/editor/dist/i18n/ko-kr' {
  // 한글 언어팩 사용 시 발생할 수 있는 에러 방지
}

/* eslint-env node */
module.exports = {
  root: true,
  // 1. oxlint의 환경 설정을 반영 (browser: true)
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  // 2. oxlint의 플러그인 및 카테고리(correctness, perf)를 extends로 구현
  extends: [
    'eslint:recommended', // correctness: error (기본 에러 체크)
    'plugin:vue/vue3-recommended', // vue 플러그인 (oxlint의 vue 대응)
    'plugin:@typescript-eslint/recommended', // typescript 플러그인
    'plugin:unicorn/recommended', // unicorn 플러그인 (oxlint의 unicorn 대응)
    'prettier', // 포맷팅 충돌 방지
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint', 'unicorn'],
  // 3. oxlintrc.json에 명시했던 개별 규칙들을 여기에 정의
  rules: {
    // oxlint의 correctness/perf 카테고리를 따르는 개별 규칙 조정
    'vue/no-unused-components': 'warn', // 기존 oxlint 규칙 그대로 반영
    'vue/no-dupe-keys': 'error', // 기존 oxlint 규칙 그대로 반영

    // oxlint의 'perf' 카테고리 대응 (성능 관련)
    'no-await-in-loop': 'error',

    // unicorn 관련 규칙 중 너무 까다로운 건 끌 수 있습니다 (선택 사항)
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/filename-case': 'off',

    // Vue 3.5 반응형 Props 구조분해를 위한 설정 (TS 에러 방지)
    'vue/no-setup-props-destructure': 'off',
  },
};

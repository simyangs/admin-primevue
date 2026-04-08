import pluginVue from 'eslint-plugin-vue';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginUnicorn from 'eslint-plugin-unicorn';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/node_modules/**'],
  },

  // 1. Vue & TypeScript 설정
  ...pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,

  // 2. Unicorn 설정
  pluginUnicorn.configs['flat/recommended'],

  // 3. 커스텀 규칙
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'unicorn/prevent-abbreviations': 'off', // 실무에서 불편한 약어 제한 끄기
      'unicorn/filename-case': 'off', // 파일명 강제 규칙 완화
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    },
  },

  // 4. Prettier 설정 (충돌 방지를 위해 항상 마지막)
  skipFormatting,
);

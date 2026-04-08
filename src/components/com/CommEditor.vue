<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css'; // 에디터 스타일
import '@toast-ui/editor/dist/i18n/ko-kr';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import colorPlugin from '@toast-ui/editor-plugin-color-syntax';
import '@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import 'tui-color-picker/dist/tui-color-picker.css';
const props = defineProps<{
  modelValue: string;
  height?: string;
}>();

const emit = defineEmits(['update:modelValue']);
const editorRef = ref<HTMLElement | null>(null);
let editor: Editor | null = null;

onMounted(() => {
  if (editorRef.value) {
    editor = new Editor({
      el: editorRef.value,
      height: props.height || '500px',
      initialEditType: 'wysiwyg',
      previewStyle: 'vertical',
      hideModeSwitch: true,
      initialValue: props.modelValue,
      language: 'ko-KR',
      plugins: [tableMergedCell, colorPlugin],
      toolbarItems: [
        ['heading', 'bold', 'italic', 'strike'],
        ['hr', 'quote'],
        ['ul', 'ol', 'task', 'indent', 'outdent'],
        ['table', 'link'],
        ['scrollSync'],
      ],
      hooks: {
        addImageBlobHook: () => {
          alert('이미지 업로드는 허용되지 않습니다.');
          return false; // 이미지 삽입 중단
        },
      },
      events: {
        change: () => {
          // 내용이 바뀔 때마다 부모에게 전달
          emit('update:modelValue', editor?.getMarkdown());
        },
      },
    });
  }
});

//부모에서 데이터가 강제로 바뀌었을 때 반영
watch(
  () => props.modelValue,
  (newVal) => {
    if (editor && newVal !== editor.getMarkdown()) {
      editor.setMarkdown(newVal);
    }
  },
);

onBeforeUnmount(() => {
  editor?.destroy();
});
</script>
<template>
  <div ref="editorRef"></div>
</template>

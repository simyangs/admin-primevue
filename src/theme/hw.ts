import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const HWPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#fff7ed',
      100: '#ffead5',
      200: '#ffd0a9',
      300: '#ffad71',
      400: '#ff7f32',
      500: '#f37321', // Hanwha Orange (Main)
      600: '#da5614',
      700: '#b54112',
      800: '#903515',
      900: '#742e14',
      950: '#3f1509',
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#868e96',
          700: '#495057',
          800: '#343a40',
          900: '#212529', // Hanwha Dark Gray
          950: '#121212',
        },
      },
    },
  },
});

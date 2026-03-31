import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const HWPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{orange.50}',
      100: '{orange.100}',
      200: '{orange.200}',
      300: '{orange.300}',
      400: '{orange.400}',
      500: '{orange.500}',
      600: '{orange.600}',
      700: '{orange.700}',
      800: '{orange.800}',
      900: '{orange.900}',
      950: '{orange.950}',
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
    },
  },
  primitive: {
    orange: {
      50: '#FFF4ED',
      100: '#FFE3D1',
      200: '#FFC2A3',
      300: '#FF9A6B',
      400: '#FF7A3D',
      500: '#FF6600', // 한화 메인 컬러
      600: '#E65C00',
      700: '#B34700',
      800: '#803300',
      900: '#4D1F00',
      950: '#261000',
    },
  },
});

//Arquivo de Tipagem para o Styled Components

import 'styled-components';
import { defaultTheme } from '../styles/themes/default';

type ThemeType = typeof defaultTheme;

declare module 'styled-components' {
    // Use a type alias instead of an empty interface to satisfy
    // the `@typescript-eslint/no-empty-object-type` rule.
    export type DefaultTheme = ThemeType;
}
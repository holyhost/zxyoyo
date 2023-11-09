'use client';

import { MantineColorsTuple, createTheme } from '@mantine/core';


const myColor: MantineColorsTuple = [
  "#effbf7",
  "#dff3ed",
  "#bae9da",
  "#91ddc5",
  "#71d4b4",
  "#5dcea9",
  "#51cba3",
  "#42b38f",
  "#369f7e",
  "#238a6b"
]
export const theme = createTheme({
  /* Put your mantine theme override here */
  primaryColor: 'myColor',
  colors: {
    myColor
  }
});

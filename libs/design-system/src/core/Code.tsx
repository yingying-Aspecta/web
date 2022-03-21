import { styled } from '../config/theme'
import { Text } from './Text'

export const Code = styled('code', {
  fontFamily: '$mono',
  whiteSpace: 'nowrap',
  padding: '2px 2px',
  borderRadius: '$1',

  fontSize: '$12',

  [`${Text} &`]: {
    fontSize: 'inherit',
  },

  variants: {
    variant: {
      gray: {
        backgroundColor: '$brandGray3',
        color: '$brandGray12',
      },
      accent: {
        backgroundColor: '$brandAccent3',
        color: '$brandAccent12',
      },
    },
  },
  defaultVariants: {
    variant: 'accent',
  },
})

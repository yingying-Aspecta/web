import React from 'react'
import { Text } from './Text'
import { VariantProps, CSS } from '../config/theme'

const DEFAULT_TAG = 'p'

type TextSizeVariants = Pick<VariantProps<typeof Text>, 'size'>
type ParagraphSizeVariants = '1' | '2' | '3'
type ParagraphVariants = { size?: ParagraphSizeVariants } & Omit<
  VariantProps<typeof Text>,
  'size'
>
type ParagraphProps = React.ComponentProps<typeof DEFAULT_TAG> &
  ParagraphVariants & { css?: CSS; as?: string }

export const Paragraph = React.forwardRef<
  React.ElementRef<typeof DEFAULT_TAG>,
  ParagraphProps
>((props, forwardedRef) => {
  const { size = '2', ...textProps } = props

  // This is the mapping of Paragraph Variants to Text variants
  const textSize: Record<ParagraphSizeVariants, TextSizeVariants['size']> = {
    1: { '@initial': '14', '@bp2': '14' },
    2: { '@initial': '16', '@bp2': '16' },
    3: { '@initial': '20', '@bp2': '20' },
  }

  // This is the mapping of Paragraph Variants to Text css
  const textCss: Record<ParagraphSizeVariants, CSS> = {
    1: {
      color: '$textSubtle',
      lineHeight: '150%',
      '@bp2': { lineHeight: '150%' },
    },
    2: {
      color: '$textSubtle',
      lineHeight: '150%',
      '@bp2': { lineHeight: '150%' },
    },
    3: {
      color: '$textSubtle',
      lineHeight: '150%',
      '@bp2': { lineHeight: '150%' },
    },
  }

  return (
    <Text
      as={DEFAULT_TAG}
      {...textProps}
      ref={forwardedRef}
      size={textSize[size]}
      css={{
        ...textCss[size],
        ...props.css,
      }}
    />
  )
})

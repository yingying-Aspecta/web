/* eslint-disable react/no-unescaped-entities */
import fs from 'fs'
import path from 'path'
import {
  SiteHeading,
  getImageProps,
  Text,
  webLinks,
} from '@siafoundation/design-system'
import { Layout } from '../../components/Layout'
import { routes } from '../../config/routes'
import { getCacheStats } from '../../content/stats'
import backgroundImage from '../../assets/backgrounds/nate-bridge.png'
import previewImage from '../../assets/previews/nate-bridge.png'
import { AsyncReturnType } from '../../lib/types'
import { getMinutesInSeconds } from '../../lib/time'
import { SectionSimple } from '../../components/SectionSimple'
import { getContentDirectory } from '@siafoundation/env'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { format } from 'date-fns'
import { MDXRemote } from 'next-mdx-remote'
import { components } from '../../config/mdx'

const backgroundImageProps = getImageProps(backgroundImage)
const previewImageProps = getImageProps(previewImage)

type Props = AsyncReturnType<typeof getStaticProps>['props']

export default function HostBestPractices({
  title,
  date,
  description,
  source,
}: Props) {
  return (
    <Layout
      title={title}
      description={description}
      path={routes.community.index}
      heading={
        <SectionSimple className="pt-24 md:pt-40 pb-6 md:pb-20">
          <SiteHeading
            title={title}
            description={description}
            size="64"
            links={[
              {
                title: 'Hosting Docs',
                link: webLinks.docs.hosting,
                newTab: true,
              },
              {
                title: 'Join our Discord',
                link: webLinks.discord,
                newTab: true,
              },
            ]}
          />
        </SectionSimple>
      }
      backgroundImage={backgroundImageProps}
      previewImage={previewImageProps}
    >
      <SectionSimple className="md:pt-20 pb-24 md:pb-40">
        <MDXRemote {...source} components={components} />
        <Text weight="bold" size="16" className="mt-20 md:mt-40 mb-24 md:mb-32">
          {`Document version date: ${format(new Date(date), 'PP')}`}
        </Text>
      </SectionSimple>
    </Layout>
  )
}

export async function getStaticProps() {
  const stats = await getCacheStats()

  const markdownWithMeta = fs.readFileSync(
    path.join(getContentDirectory(), 'pages/hosting-best-practices.mdx'),
    'utf-8'
  )

  const { data, content } = matter(markdownWithMeta)

  const source = await serialize(content)

  return {
    props: {
      title: data.title as string,
      date: data.date as string,
      description: data.description as string,
      source,
      fallback: {
        '/api/stats': stats,
      },
    },
    revalidate: getMinutesInSeconds(5),
  }
}

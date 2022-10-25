import {
  ContentItem,
  ContentGallery,
  Flex,
  Grid,
  Section,
  SiteHeading,
  Callout,
  ContentProject,
  WavesBackdrop,
} from '@siafoundation/design-system'
import { times } from 'lodash'
import { SectionHeading as DSSectionHeading } from '../components/SectionHeading'
import { SubsectionHeading } from '../components/SubsectionHeading'

export function Sites() {
  return (
    <>
      <Section css={{ pt: '$9' }}>
        <DSSectionHeading>SiteHeading</DSSectionHeading>
        <Flex direction="column" gap="9">
          <SiteHeading
            size="20"
            title="Size 20"
            description={`
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, qui!
            `}
          />
          <SiteHeading
            size="24"
            title="Size 24"
            description={`
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, qui!
            `}
          />
          <SiteHeading
            size="32"
            title="Size 32"
            description={`
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, qui!
            `}
          />
          <SiteHeading
            size="64"
            title="Size 64"
            description={`
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, qui!
            `}
          />
          <SiteHeading
            size="64"
            eyebrow="Eyebrow"
            title="Heading with Eyebrow"
            description={`
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, qui!
            `}
          />
          <SiteHeading
            size="32"
            title="Heading 32 with Buttons"
            description={`
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, qui!
            `}
            links={[
              {
                title: 'Urbit',
                link: 'https://urbit.org',
                newTab: true,
              },
              {
                title: 'Scuttlebutt',
                link: 'https://ssbc.github.io/scuttlebutt-protocol-guide/',
                newTab: true,
              },
            ]}
          />
          <SiteHeading
            size="64"
            title="Heading 64 with Buttons"
            description={`
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, qui!
            `}
            links={[
              {
                title: 'Urbit',
                link: 'https://urbit.org',
                newTab: true,
              },
              {
                title: 'Scuttlebutt',
                link: 'https://ssbc.github.io/scuttlebutt-protocol-guide/',
                newTab: true,
              },
            ]}
          />
        </Flex>
      </Section>
      <Section css={{ pt: '$9' }}>
        <DSSectionHeading>ContentItem</DSSectionHeading>
        <Grid
          gap="5"
          columns={{
            '@initial': 1,
            '@bp1': 2,
            '@bp3': 3,
          }}
        >
          <ContentItem
            title="Content Item"
            subtitle={`
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, qui!
            `}
            newTab
          />
          <ContentItem
            title="Content Item with external link"
            subtitle={`
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, qui!
            `}
            link={'https://urbit.org'}
            newTab
          />
          <ContentItem
            title="Content Item with date"
            date={'10/04/2022'}
            subtitle={`
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, qui!
            `}
            link={'https://urbit.org'}
            newTab
          />
          <ContentItem
            title="Content Item with date and icon"
            icon="CenterCircle"
            date={'10/04/2022'}
            subtitle={`
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, qui!
            `}
            link={'https://urbit.org'}
            newTab
          />
        </Grid>
      </Section>
      <Section css={{ pt: '$9' }}>
        <DSSectionHeading>ContentProject</DSSectionHeading>
        <Grid
          gap="5"
          columns={{
            '@initial': 1,
            '@bp1': 2,
            '@bp3': 3,
          }}
        >
          <ContentProject
            title="Filebase"
            logo="filebase"
            tags={[]}
            subtitle={`
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, qui!
            `}
            link={'https://filebase.com'}
            newTab
          />
        </Grid>
      </Section>
      <Section css={{ pt: '$12' }}>
        <DSSectionHeading>ContentGallery</DSSectionHeading>
      </Section>
      <Section css={{ pt: '$9' }}>
        <SubsectionHeading>default</SubsectionHeading>
        <ContentGallery
          items={times(6, (i) => ({
            title: `Lorem ipsum dolor, sit amet consectetur elit. ${i + 1}`,
            tags: [`group_${(i % 3) + 1}`],
            description: `
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, qui!
                `,
            link: 'https://ssbc.github.io/scuttlebutt-protocol-guide/',
            newTab: true,
          }))}
        />
      </Section>
      <Section css={{ pt: '$9' }}>
        <SubsectionHeading>columns 1</SubsectionHeading>
        <ContentGallery
          columns={{
            '@inital': '1',
          }}
          items={times(6, (i) => ({
            title: `Lorem ipsum dolor, sit amet consectetur elit. ${i + 1}`,
            tags: [`group_${(i % 3) + 1}`],
            link: 'https://urbit.org',
            newTab: true,
          }))}
        />
      </Section>
      <Section css={{ pt: '$9' }}>
        <SubsectionHeading>variant filterable / columns 3</SubsectionHeading>
        <ContentGallery
          filterable="filterable"
          columns={{
            '@initial': '1',
            '@bp1': '2',
            '@bp3': '3',
          }}
          items={times(6, (i) => ({
            title: `Title ${i + 1}`,
            subtitle: 'Subtitle',
            tags: [`group_${(i % 3) + 1}`],
            description: `
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, qui!
                `,
            link: 'https://urbit.org',
            newTab: true,
          }))}
        />
      </Section>
      <Section css={{ pt: '$12' }}>
        <DSSectionHeading>WavesBackdrop</DSSectionHeading>
      </Section>
      <Section css={{ position: 'relative' }}>
        <WavesBackdrop />
      </Section>
      <Section css={{ pt: '$12' }}>
        <DSSectionHeading>Callout</DSSectionHeading>
      </Section>
      <Section css={{ pt: '$9' }}>
        <SubsectionHeading>size 1</SubsectionHeading>
        <Grid
          columns={{
            '@initial': '1',
            '@bp2': '2',
          }}
          gap="5"
        >
          <Callout
            title="Title"
            description={`
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, qui!
          `}
            startTime={0}
            actionTitle="Urbit"
            actionLink="https://urbit.org"
            actionNewTab
          />
          <Callout
            title="Title"
            description={`
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, qui!
          `}
            startTime={20}
            actionTitle="Urbit"
            actionLink="https://urbit.org"
            actionNewTab
          />
        </Grid>
      </Section>
      <Section css={{ pt: '$9' }}>
        <SubsectionHeading>size 2</SubsectionHeading>
        <Callout
          title="Title"
          size="2"
          description={`
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, qui!
          `}
          actionTitle="Urbit"
          startTime={0}
          actionLink="https://urbit.org"
          actionNewTab
        />
      </Section>
    </>
  )
}

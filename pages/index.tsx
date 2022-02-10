import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import GradientLayout from '../components/gradientLayout'
import prisma from '../lib/prisma'

export default function Home({ artists }) {
  return (
    <GradientLayout
      color="blue"
      title="Isai Reyes"
      subtitle="profile"
      description="A true musician"
      roundImage
      image="https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_960_720.png"
    >
      <Box color="white" paddingX="20px">
        <Box marginBottom="20px">
          <Text fontSize="2xl" fontWeight="bold">
            Top Artists of the Month
          </Text>
          <Text fontSize="sm">only visible for you</Text>
        </Box>
        <Flex gap="10px">
          {artists.map((artist) => (
            <Box
              key={artist.id}
              bg="gray.900"
              padding="15px"
              borderRadius="5px"
              width="200px"
            >
              <Image
                src="https://placekitten.com/300/300"
                borderRadius="100%"
              />
              <Box marginTop="15px">
                <Text fontSize="large">{artist.name}</Text>
                <Text fontSize="small">Artist</Text>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  )
}

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({})

  return {
    props: { artists },
  }
}

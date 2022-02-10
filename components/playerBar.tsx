import { Box, Flex, Text } from '@chakra-ui/layout'

const PlayerBar = () => {
  return (
    <Box bgColor="gray.900" height="100px" width="100vw" padding="10px">
      <Flex align="center">
        <Box padding="20px" color="white" width="30%">
          <Text fontSize="large">Song Name</Text>
          <Text fontSize="sm">Artist Name</Text>
        </Box>

        <Box width="40%">controls</Box>
      </Flex>
    </Box>
  )
}

export default PlayerBar

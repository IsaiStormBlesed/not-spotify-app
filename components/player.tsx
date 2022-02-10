import ReactHowler from 'react-howler'
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from 'react-icons/md'
import { useStoreActions } from 'easy-peasy'
import { Box, Center, Flex, Text } from '@chakra-ui/layout'
import {
  ButtonGroup,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from '@chakra-ui/react'

const Player = () => {
  return (
    <Box>
      <Center color="gray.600">
        <ButtonGroup>
          <IconButton
            outline="none"
            fontSize="24px"
            variant="link"
            aria-label="shuffle"
            icon={<MdShuffle />}
          />
          <IconButton
            outline="none"
            fontSize="24px"
            variant="link"
            aria-label="previous"
            icon={<MdSkipPrevious />}
          />
          <IconButton
            color="white"
            outline="none"
            fontSize="40px"
            variant="link"
            aria-label="play"
            icon={<MdOutlinePlayCircleFilled />}
          />
          <IconButton
            color="white"
            outline="none"
            fontSize="40px"
            variant="link"
            aria-label="pause"
            icon={<MdOutlinePauseCircleFilled />}
          />
          <IconButton
            outline="none"
            fontSize="24px"
            variant="link"
            aria-label="next"
            icon={<MdSkipNext />}
          />
          <IconButton
            outline="none"
            fontSize="24px"
            variant="link"
            aria-label="repeat"
            icon={<MdOutlineRepeat />}
          />
        </ButtonGroup>
      </Center>

      <Box color="gray.500">
        <Flex justify="center" align="end">
          <Box width="10%">
            <Text fontSize="xs" textAlign="center">
              1:30
            </Text>
          </Box>
          <Box width="80%">
            <RangeSlider
              aria-label={['min', 'max']}
              step={0.1}
              min={0}
              max={250}
              id="player-range"
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="10%" textAlign="center">
            <Text fontSize="xs">2:50</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default Player

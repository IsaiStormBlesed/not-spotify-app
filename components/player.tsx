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
import { useState } from 'react'

const Player = ({ songs, activeSong }) => {
  const [playing, setPlaying] = useState(true)
  const [index, setIndex] = useState(0)
  const [seek, setSeek] = useState(0.0)
  const [repeat, setRepeat] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [duration, setDuration] = useState(0.0)

  const setPlayState = (value) => {
    setPlaying(value)
  }

  const onShuffle = () => {
    setShuffle((state) => !state)
  }

  const onRepeat = () => {
    setRepeat((state) => !state)
  }

  return (
    <Box>
      <Box>
        <ReactHowler playing={playing} src={activeSong?.url} />
      </Box>
      <Center color="gray.600">
        <ButtonGroup>
          <IconButton
            color={shuffle ? 'white' : 'gray.600'}
            outline="none"
            fontSize="24px"
            variant="link"
            aria-label="shuffle"
            icon={<MdShuffle />}
            onClick={onShuffle}
          />
          <IconButton
            outline="none"
            fontSize="24px"
            variant="link"
            aria-label="previous"
            icon={<MdSkipPrevious />}
          />
          {playing ? (
            <IconButton
              color="white"
              outline="none"
              fontSize="40px"
              variant="link"
              aria-label="pause"
              icon={<MdOutlinePauseCircleFilled />}
              onClick={() => setPlayState(false)}
            />
          ) : (
            <IconButton
              color="white"
              outline="none"
              fontSize="40px"
              variant="link"
              aria-label="play"
              icon={<MdOutlinePlayCircleFilled />}
              onClick={() => setPlayState(true)}
            />
          )}
          <IconButton
            outline="none"
            fontSize="24px"
            variant="link"
            aria-label="next"
            icon={<MdSkipNext />}
          />
          <IconButton
            color={repeat ? 'white' : 'gray.600'}
            outline="none"
            fontSize="24px"
            variant="link"
            aria-label="repeat"
            icon={<MdOutlineRepeat />}
            onClick={onRepeat}
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
          <Flex width="80%" align="end">
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
          </Flex>
          <Box width="10%" textAlign="center">
            <Text fontSize="xs">2:50</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default Player

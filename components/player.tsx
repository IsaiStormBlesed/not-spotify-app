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
import { useEffect, useRef, useState } from 'react'
import { formatTime } from '../lib/formatters'

const Player = ({ songs, activeSong }) => {
  const [playing, setPlaying] = useState(false)
  const [index, setIndex] = useState(0)
  const [seek, setSeek] = useState(0.0)
  const [isSeeking, setIsSeeking] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [duration, setDuration] = useState(0.0)
  const soundRef = useRef(null)

  useEffect(() => {
    let timerId

    if (playing && !isSeeking) {
      const f = () => {
        setSeek(soundRef.current.seek())
        timerId = requestAnimationFrame(f)
      }

      timerId = requestAnimationFrame(f)
      return () => cancelAnimationFrame(timerId)
    }

    cancelAnimationFrame(timerId)
  }, [playing, isSeeking])

  const setPlayState = (value) => {
    setPlaying(value)
  }

  const onShuffle = () => {
    setShuffle((state) => !state)
  }

  const onRepeat = () => {
    setRepeat((state) => !state)
  }

  const prevSong = () => {
    setIndex((state) => {
      return state ? state - 1 : songs.length - 1
    })
  }

  const nextSong = () => {
    setIndex((state) => {
      if (shuffle) {
        const next = Math.floor(Math.random() * songs.length)

        if (next === state) {
          return nextSong()
        }

        return next
      } else {
        return state === songs.length - 1 ? 0 : state + 1
      }
    })
  }

  const onEnd = () => {
    if (repeat) {
      setSeek(0)
      soundRef.current.seek(0)
    } else {
      nextSong()
    }
  }

  const onLoad = () => {
    const songDuration = soundRef.current.duration()
    console.log(songDuration)

    setDuration(songDuration)
  }

  const onSeek = (e) => {
    setSeek(parseFloat(e[0]))
    soundRef.current.seek(e[0])
  }

  return (
    <Box>
      <Box>
        <ReactHowler
          playing={playing}
          src={activeSong?.url}
          ref={soundRef}
          onLoad={onLoad}
          onEnd={onEnd}
        />
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
            onClick={prevSong}
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
            onClick={nextSong}
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
              {formatTime(seek)}
            </Text>
          </Box>
          <Flex width="80%" align="end">
            <RangeSlider
              aria-label={['min', 'max']}
              step={0.1}
              min={0}
              max={duration ? duration.toFixed(2) : 0}
              onChange={onSeek}
              value={[seek]}
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
              id="player-range"
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Flex>
          <Box width="10%" textAlign="center">
            <Text fontSize="xs">{formatTime(duration)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default Player

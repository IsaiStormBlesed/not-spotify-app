import { Box } from '@chakra-ui/layout'
import { IconButton, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { BsFillPlayFill } from 'react-icons/bs'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { formatDate, formatTime } from '../lib/formatters'

const SongsTable = ({ songs }) => {
  return (
    <Box bg="transparent" color="white">
      <Box padding="10px" marginBottom="20px">
        <IconButton
          icon={<BsFillPlayFill fontSize="30px" />}
          aria-label="play"
          colorScheme="green"
          isRound
          size="lg"
        />
      </Box>

      <Table variant="unstyled">
        <Thead borderBottom="1px solid" borderColor="rgba(255,255,255,0.2)">
          <Tr>
            <Th>#</Th>
            <Th>Title</Th>
            <Th>Date added</Th>
            <Th>
              <AiOutlineClockCircle />
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {songs.map((song, id) => (
            <Tr
              key={song.id}
              sx={{
                transition: 'all .3s',
                '&:hover': {
                  bgColor: 'rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                },
              }}
            >
              <Td>{id + 1}</Td>
              <Td>{song.name}</Td>
              <Td>{formatDate(song.createdAt)}</Td>
              <Td>{formatTime(song.duration)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default SongsTable

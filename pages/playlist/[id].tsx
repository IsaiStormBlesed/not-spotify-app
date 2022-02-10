import { validateToken } from '../../lib/auth'
import prisma from '../../lib/prisma'

const Playlist = ({ playlist }) => {
  return <h1>{playlist.name}</h1>
}

export const getServerSideProps = async ({ query, req }) => {
  const { id } = validateToken(req.cookies.NO_SPOTIFY_TOKEN)
  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  })
  return { props: { playlist } }
}

export default Playlist

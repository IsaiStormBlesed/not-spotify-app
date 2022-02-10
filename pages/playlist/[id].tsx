import GradientLayout from '../../components/gradientLayout'
import { validateToken } from '../../lib/auth'
import prisma from '../../lib/prisma'

const getBGColors = (id) => {
  const colors = [
    'red',
    'blue',
    'green',
    'orange',
    'purple',
    'gray',
    'yellow',
    'teal',
  ]

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)]
}

const Playlist = ({ playlist }) => {
  const color = getBGColors(playlist.id)

  return (
    <GradientLayout
      color={color}
      title={playlist.name}
      subtitle="playlist"
      description={`${playlist.songs.length} songs`}
      roundImage={false}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <h1>{playlist.name}</h1>
    </GradientLayout>
  )
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

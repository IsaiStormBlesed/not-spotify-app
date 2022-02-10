import GradientLayout from '../../components/gradientLayout'
import SongsTable from '../../components/songsTable'
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
      <SongsTable songs={playlist.songs} />
    </GradientLayout>
  )
}

export const getServerSideProps = async ({ query, req }) => {
  let user

  try {
    const { id } = validateToken(req.cookies.NO_SPOTIFY_TOKEN)
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        direction: '/signin',
      },
    }
  }

  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: user.id,
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

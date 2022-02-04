import NextImage from "next/image";
import { 
  Box,
  List,
  ListItem, 
  ListIcon,
  LinkBox, 
  LinkOverlay,
  Divider,
  Center
 } from "@chakra-ui/layout";
 import { 
   MdHome,
   MdSearch,
   MdLibraryMusic,
   MdPlaylistAdd,
   MdFavorite
  } from "react-icons/md";

const navMenuItems = [
  {
    name: 'Home',
    icon: MdHome,
    route: '/'
  },
  {
    name: 'Search',
    icon: MdSearch,
    route: '/'
  },
  {
    name: 'Your Library',
    icon: MdLibraryMusic,
    route: '/library'
  },
]

const Sidebar = () => {
  return (
    <Box
      width='100%'
      height='calc(100vh - 100px)'
      bg='black'
      paddingX='5px'
      color='gray'
    >
      <Box paddingY='20px'>
        <Box width='120px' marginBottom='20px' paddingX='20px' >
          <NextImage src='/logo.svg' height={60} width={120}/>
        </Box>
      </Box>
    </Box>
  )
}

export default Sidebar
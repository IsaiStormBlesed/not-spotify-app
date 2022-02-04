import NextImage from "next/image";
import NextLink from "next/link";
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
      {/* Content Box */}
      <Box paddingY='20px'>
        {/* ImageBox */}
        <Box width='120px' marginBottom='20px' paddingX='20px' >
          <NextImage src='/logo.svg' height={60} width={120}/>
        </Box>

        {/* NavItems Content */}
        <Box marginBottom='20px' >
          <List spacing={2} >
            {
              navMenuItems.map(item => (
                <ListItem paddingX='20px' fontSize='16px' key={item.name} >
                  <LinkBox>
                    <NextLink href={item.route} passHref >
                      <LinkOverlay>
                        <ListIcon as={item.icon} color='white' marginRight='20px' />
                        { item.name }
                      </LinkOverlay>
                    </NextLink>
                  </LinkBox>        
                </ListItem>
              ))
            }
          </List>
        </Box>
      </Box>
    </Box>
  )
}

export default Sidebar
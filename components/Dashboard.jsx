import { useRouter } from 'next/router';
import NextLink from 'next/link';
import {
  IconButton,
  Avatar,
  Box,
  Button,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FiHome, FiCompass, FiStar, FiMenu, FiBell } from 'react-icons/fi';
import { GrLogout } from 'react-icons/gr';
import { BiUser } from 'react-icons/bi';
import { MdCardTravel } from 'react-icons/md';
import { useAuth } from '@/context/AuthUserContext';

export default function Dashboard({ user, children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} user={user} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map(({ name, href, icon }) => (
        <NavItem key={name} href={href} icon={icon}>
          {name}
        </NavItem>
      ))}
    </Box>
  );
};

const LinkItems = [
  { name: 'Overview', href: '/dashboard/overview', icon: FiHome },
  { name: 'Explore', href: '/dashboard/explore', icon: FiCompass },
  { name: 'Travels', href: '/dashboard/travels', icon: MdCardTravel },
  { name: 'Favorites', href: '/dashboard/favorites', icon: FiStar },
];

const NavItem = ({ icon, href, children, ...rest }) => {
  return (
    <NextLink href={href} style={{ textDecoration: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </NextLink>
  );
};

const MobileNav = ({ onOpen, user, ...rest }) => {
  const router = useRouter();
  const { signOut } = useAuth();
  const fullname = `${user?.firstname} ${user?.lastname}`;

  const logout = async () => {
    await signOut();
    router.push('/sign-in');
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />
        <Flex alignItems={'center'}>
          <Button variant="ghost">
            <HStack>
              <Avatar size="sm" icon={<BiUser fontSize="1.5rem" />} />
              <VStack
                display={{ base: 'none', md: 'flex' }}
                alignItems="flex-start"
                spacing="1px"
                ml="2"
              >
                <Text fontSize="sm">{fullname}</Text>
              </VStack>
            </HStack>
          </Button>
          <IconButton size="lg" variant="ghost" icon={<GrLogout />} onClick={logout} />
        </Flex>
      </HStack>
    </Flex>
  );
};

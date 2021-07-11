import { useRouter } from 'next/router';
import {
  IconButton,
  Avatar,
  Button,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { FiMenu, FiBell } from 'react-icons/fi';
import { GrLogout } from 'react-icons/gr';
import { BiUser } from 'react-icons/bi';
import { useAuth } from '@/context/AuthUserContext';

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

export default MobileNav;

import Link from 'next/link';
import { Box, CloseButton, Flex, useColorModeValue, Text, Icon } from '@chakra-ui/react';
import { FiHome, FiCompass, FiStar } from 'react-icons/fi';
import { MdCardTravel } from 'react-icons/md';

const LinkItems = [
  { name: 'Overview', href: '/dashboard/overview', icon: FiHome },
  { name: 'Explore', href: '/dashboard/explore', icon: FiCompass },
  { name: 'Travels', href: '/dashboard/travels', icon: MdCardTravel },
  { name: 'Favorites', href: '/dashboard/favorites', icon: FiStar },
];

const Sidebar = ({ onClose, ...rest }) => {
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

const NavItem = ({ icon, href, children, ...rest }) => {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
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
    </Link>
  );
};

export default Sidebar;

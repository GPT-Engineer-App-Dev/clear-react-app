import { Box, Container, Flex, Text, VStack, Link, Button, List, ListItem } from "@chakra-ui/react";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";

import { useEvents } from "../integrations/supabase/index.js"; // Import the useEvents hook

const Index = () => {
  const { session, logout } = useSupabaseAuth();
  const { data: events, error } = useEvents(); // Fetch events using the useEvents hook
  const { session, logout } = useSupabaseAuth();

  return (
    <Box>
      {/* Navigation Bar */}
      <Box as="nav" bg="blue.500" color="white" py={4}>
        <Container maxW="container.md">
          <Flex justify="space-between" align="center">
            <Text fontSize="xl" fontWeight="bold">MyApp</Text>
            <Flex>
              <Link href="/" mx={2} color="white">Home</Link>
              <Link href="/about" mx={2} color="white">About</Link>
              <Link href="/contact" mx={2} color="white">Contact</Link>
              {session ? (
                <Button onClick={logout} mx={2} color="white">Logout</Button>
              ) : (
                <Link href="/login" mx={2} color="white">Login</Link>
              )}
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* Main Content Area */}
      <Container centerContent maxW="container.md" py={8}>
        <VStack spacing={4}>
          <Text fontSize="2xl">Welcome to MyApp</Text>
          <Text>This is a basic structure of a React app with Chakra UI.</Text>
        {session && (
            <>
              <Text fontSize="xl">Events</Text>
              {error && <Text color="red.500">{error.message}</Text>}
              <List spacing={3}>
                {events?.map(event => (
                  <ListItem key={event.id}>
                    <Text fontWeight="bold">{event.name}</Text>
                    <Text>{event.description}</Text>
                    <Text>{new Date(event.date).toLocaleDateString()}</Text>
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </VStack>
      </Container>

      {/* Footer */}
      <Box as="footer" bg="gray.700" color="white" py={4} mt="auto">
        <Container maxW="container.md">
          <Text textAlign="center">&copy; 2023 MyApp. All rights reserved.</Text>
        </Container>
      </Box>
    </Box>
  );
};

export default Index;
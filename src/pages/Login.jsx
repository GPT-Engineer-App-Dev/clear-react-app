import { Box, Button, Container, Flex, Input, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { session, logout } = useSupabaseAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4}>
        {session ? (
          <>
            <Text fontSize="2xl">Welcome, {session.user.email}</Text>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Text fontSize="2xl">Login</Text>
            {error && <Text color="red.500">{error}</Text>}
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleLogin}>Login</Button>
          </>
        )}
      </VStack>
    </Container>
  );
};

export default Login;
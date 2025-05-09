import { Flex, ScrollArea } from "@radix-ui/themes";
import NavBar from "./NavBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex height="100vh" width="100vw" direction="column">
      <NavBar />
      <ScrollArea>
        {children}
      </ScrollArea>
    </Flex>
  );
}

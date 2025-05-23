import { Flex, ScrollArea } from "@radix-ui/themes";
import NavBar from "./NavBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex height="100vh" direction="column" gapY="1">
      <NavBar />
      <ScrollArea type="always" scrollbars="vertical" style={{ height: "95vh" }}>
        {children}
      </ScrollArea>
    </Flex>
  );
}

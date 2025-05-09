import { Flex, ScrollArea } from "@radix-ui/themes";
import SideBar from "./SideBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex height="100%" gapY="1">
      <SideBar/>
      <ScrollArea type="always" scrollbars="vertical" style={{ height: "100%" }}>
        {children}
      </ScrollArea>
    </Flex>
  );
}

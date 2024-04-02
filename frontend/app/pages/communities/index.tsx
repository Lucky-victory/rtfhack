import { HeaderNav } from "@/components/HeaderNav";
import PageLoader from "@/components/PageLoader";
import PageWrapper from "@/components/PageWrapper";
import { Box } from "@chakra-ui/react";

export default function CommunitiesPage() {
  return (
    <PageWrapper>
      <PageLoader>
        <HeaderNav />
        <Box as="main"></Box>
      </PageLoader>
    </PageWrapper>
  );
}

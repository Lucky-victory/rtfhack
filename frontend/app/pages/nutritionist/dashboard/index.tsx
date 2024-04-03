import DashboardEmptyArea from "@/components/DashboardEmptyArea";
import DashboardLayout from "@/components/NutritionistDashboardLayout";
import { Flex } from "@chakra-ui/react";

export default function NutritionistDashboardPage() {
  return (
    <DashboardLayout>
      <Flex direction={"column"} w={"full"} py={5} px={4}>
        <DashboardEmptyArea
          text="No data to show"
          isEmpty={false}
          isLoading={false}
        >
          children
        </DashboardEmptyArea>
      </Flex>
    </DashboardLayout>
  );
}

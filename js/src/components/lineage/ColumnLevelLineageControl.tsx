import { CloseIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Flex,
  Text,
  IconButton,
  Code,
  Icon,
  Link,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";

interface ColumnLevelLineageControlProps {
  node: string;
  column: string;
  reset: () => void;
}
export const ColumnLevelLineageControl = ({
  node,
  column,
  reset,
}: ColumnLevelLineageControlProps) => {
  return (
    <Flex
      direction="row"
      alignItems="center"
      gap="5px"
      p="5px 10px"
      borderRadius="md"
      boxShadow="md"
      border="1px solid"
      borderColor="gray.200"
      bg="white"
      fontSize={"10pt"}>
      <Text>Column Lineage for</Text>
      <Code>
        {node}.{column}
      </Code>
      <Popover trigger="hover" placement="top-start">
        <PopoverTrigger>
          <Icon boxSize="10px" as={InfoOutlineIcon} color="gray.500" cursor="pointer" />
        </PopoverTrigger>
        <PopoverContent bg="black" color="white">
          <PopoverBody fontSize="sm">
            Column-Level Lineage provides visibility into the upstream and downstream relationships
            of a column.
            <Link href="https://datarecce.io/docs/features/column-level-lineage/" target="_blank">
              Learn more
            </Link>
            .
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <IconButton icon={<CloseIcon />} aria-label={""} onClick={reset} size="xs" />
    </Flex>
  );
};

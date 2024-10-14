import { useRecceActionContext } from "@/lib/hooks/RecceActionContext";
import {
  Flex,
  Box,
  Spacer,
  Menu,
  MenuButton,
  IconButton,
  Icon,
  Portal,
  MenuList,
  MenuGroup,
  MenuItem,
} from "@chakra-ui/react";
import { VscKebabVertical } from "react-icons/vsc";
import { supportsHistogramDiff } from "../histogram/HistogramDiffForm";

export function ColumnNameCell({
  model,
  name,
  baseType,
  currentType,
}: {
  model: string;
  name: string;
  baseType?: string;
  currentType?: string;
}) {
  const { runAction } = useRecceActionContext();
  const columnType = currentType || baseType;

  const handleHistogramDiff = () => {
    runAction(
      "histogram_diff",
      { model, column_name: name, column_type: columnType },
      { showForm: false }
    );
  };

  const handleTopkDiff = () => {
    runAction(
      "top_k_diff",
      { model, column_name: name, k: 50 },
      { showForm: false }
    );
  };
  const addedOrRemoved = !baseType || !currentType;

  return (
    <Flex>
      <Box overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
        {name}
      </Box>
      <Spacer />

      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              className="row-context-menu"
              visibility={isOpen ? "visible" : "hidden"}
              width={isOpen ? "auto" : "0px"}
              minWidth={isOpen ? "auto" : "0px"}
              as={IconButton}
              icon={<Icon as={VscKebabVertical} />}
              variant="unstyled"
              size={"sm"}
            />

            <Portal>
              <MenuList lineHeight="20px">
                <MenuGroup title="Column" m="0" p="4px 12px">
                  <MenuItem fontSize="10pt">Set Alias Name</MenuItem>
                </MenuGroup>
                <MenuGroup title="Diff" m="0" p="4px 12px">
                  <MenuItem
                    fontSize="10pt"
                    onClick={handleHistogramDiff}
                    isDisabled={
                      addedOrRemoved ||
                      (columnType ? !supportsHistogramDiff(columnType) : true)
                    }
                  >
                    Histogram Diff
                  </MenuItem>
                  <MenuItem
                    fontSize="10pt"
                    onClick={handleTopkDiff}
                    isDisabled={addedOrRemoved}
                  >
                    Top-k Diff
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Portal>
          </>
        )}
      </Menu>
    </Flex>
  );
}

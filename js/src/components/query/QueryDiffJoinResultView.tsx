import "react-data-grid/lib/styles.css";

import {
  QueryDiffJoinResult,
  QueryDiffParams,
  QueryDiffViewOptions,
} from "@/lib/api/adhocQuery";
import {
  Box,
  Center,
  Checkbox,
  Flex,
  IconButton,
  Spacer,
  Tooltip,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { toQueryDiffJoinGrid } from "./querydiff";

import "./styles.css";
import { Run } from "@/lib/api/types";
import {
  EmptyRowsRenderer,
  ScreenshotDataGrid,
} from "../data-grid/ScreenshotDataGrid";
import { RunResultViewProps } from "../run/types";
import { AddIcon, WarningIcon } from "@chakra-ui/icons";

export interface QueryDiffJoinResultViewProps
  extends RunResultViewProps<
    QueryDiffParams,
    QueryDiffJoinResult,
    QueryDiffViewOptions
  > {
  onAddToChecklist?: (run: Run<QueryDiffParams, QueryDiffJoinResult>) => void;
}

export const QueryDiffJoinResultView = ({
  run,
  onAddToChecklist,
  viewOptions,
  onViewOptionsChanged,
}: QueryDiffJoinResultViewProps) => {
  const changedOnly = useMemo(
    () => viewOptions?.changed_only || false,
    [viewOptions]
  );
  const pinnedColumns = useMemo(
    () => viewOptions?.pinned_columns || [],
    [viewOptions]
  );

  const gridData = useMemo(() => {
    const handlePinnedColumnsChanged = (pinnedColumns: string[]) => {
      if (onViewOptionsChanged) {
        onViewOptionsChanged({
          ...viewOptions,
          pinned_columns: pinnedColumns,
        });
      }
    };

    if (!run.result || !run?.params?.primary_keys) {
      return { columns: [], rows: [] };
    }

    const primaryKeys = run.params.primary_keys;

    return toQueryDiffJoinGrid(run?.result, primaryKeys, {
      changedOnly,
      pinnedColumns,
      onPinnedColumnsChange: handlePinnedColumnsChanged,
    });
  }, [run, viewOptions, changedOnly, pinnedColumns, onViewOptionsChanged]);

  if (gridData.columns.length === 0) {
    return <Center height="100%">No data</Center>;
  }

  if (changedOnly && gridData.rows.length === 0) {
    return <Center height="100%">No change</Center>;
  }

  const toggleChangedOnly = () => {
    const changedOnly = !viewOptions?.changed_only;
    if (onViewOptionsChanged) {
      onViewOptionsChanged({ ...viewOptions, changed_only: changedOnly });
    }
  };

  const limit = run.result?.limit || 0;
  const warningLimit =
    limit > 0 && run?.result?.more
      ? `Warning: Displayed results are limited to ${limit.toLocaleString()} records. To ensure complete data retrieval, consider applying a LIMIT or WHERE clause to constrain the result set.`
      : null;

  return (
    <Flex
      direction="column"
      backgroundColor="rgb(249, 249, 249)"
      height={"100%"}
    >
      <Flex
        borderBottom="1px solid lightgray"
        justifyContent="flex-end"
        gap="5px"
        alignItems="center"
        px="10px"
        bg={warningLimit ? "orange.100" : "inherit"}
      >
        {warningLimit && (
          <Box>
            <WarningIcon color="orange.600" /> {warningLimit}
          </Box>
        )}
        <Spacer minHeight="32px" />
        <Checkbox
          isChecked={viewOptions?.changed_only}
          onChange={toggleChangedOnly}
        >
          Changed only
        </Checkbox>
        {onAddToChecklist && (
          <Tooltip label="Add to Checklist">
            <IconButton
              variant="unstyled"
              size="sm"
              aria-label="Add"
              icon={<AddIcon />}
              onClick={() => onAddToChecklist(run)}
            />
          </Tooltip>
        )}
      </Flex>
      <ScreenshotDataGrid
        style={{ blockSize: "auto", maxHeight: "100%", overflow: "auto" }}
        columns={gridData.columns}
        rows={gridData.rows}
        renderers={{ noRowsFallback: <EmptyRowsRenderer /> }}
        defaultColumnOptions={{
          resizable: true,
          maxWidth: 800,
          minWidth: 35,
        }}
        className="rdg-light"
        enableScreenshot={true}
      />
    </Flex>
  );
};

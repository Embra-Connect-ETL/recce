import "react-data-grid/lib/styles.css";
import { Column } from "react-data-grid";
import { QueryParams, QueryResult } from "@/lib/api/adhocQuery";
import { Box, Center, Flex, Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { CSSProperties, useMemo, useState } from "react";
import { DataFrame, Run } from "@/lib/api/types";
import { ScreenshotDataGrid } from "../data-grid/ScreenshotDataGrid";
import { defaultRenderCell } from "./querydiff";
import { VscPin, VscPinned } from "react-icons/vsc";
import { RunResultViewProps } from "../run/types";
import { AddIcon } from "@chakra-ui/icons";

interface QueryResultViewProp
  extends RunResultViewProps<QueryParams, QueryResult> {
  onAddToChecklist?: (run: Run<QueryParams, QueryResult>) => void;
}

interface QueryDataGridOptions {
  pinnedColumns?: string[];
  onPinnedColumnsChange?: (pinnedColumns: string[]) => void;
}

function DataFrameColumnHeader({
  name,
  pinnedColumns = [],
  onPinnedColumnsChange = () => {},
  onAddToChecklist,
}: { name: string } & QueryDataGridOptions) {
  const isPinned = pinnedColumns.includes(name);

  const handleUnpin = () => {
    const newPinnedColumns = pinnedColumns.filter((item) => item !== name);

    onPinnedColumnsChange(newPinnedColumns);
  };

  const handlePin = () => {
    const newPinnedColumns = [...pinnedColumns, name];

    onPinnedColumnsChange(newPinnedColumns);
  };

  return (
    <Flex className="grid-header" alignItems="center">
      <Box flex={1}>{name}</Box>

      <Icon
        className={isPinned ? "unpin-icon" : "pin-icon"}
        display={isPinned ? "block" : "none"}
        cursor="pointer"
        as={isPinned ? VscPinned : VscPin}
        onClick={isPinned ? handleUnpin : handlePin}
      />
    </Flex>
  );
}

function toDataGrid(result: DataFrame, options: QueryDataGridOptions) {
  const columns: Column<any, any>[] = [];
  const pinnedColumns = options.pinnedColumns || [];
  const fields = result.schema.fields;
  const toColumn = (name: string) => ({
    key: name,
    name: <DataFrameColumnHeader name={name} {...options} />,
    width: "auto",
    renderCell: defaultRenderCell,
  });

  columns.push({
    key: "index",
    name: "",
    width: 10,
    cellClass: "index-column",
  });

  pinnedColumns.forEach((name) => {
    columns.push(toColumn(name));
  });

  fields
    .filter((field) => field.name !== "index")
    .filter((field) => !pinnedColumns.includes(field.name))
    .forEach(({ name }) => {
      columns.push(toColumn(name));
    });

  return { columns, rows: result.data };
}

export const QueryResultView = ({
  run,
  onAddToChecklist,
}: QueryResultViewProp) => {
  const [pinnedColumns, setPinnedColumns] = useState<string[]>([]);
  const dataframe = run?.result?.result;
  const gridData = useMemo(() => {
    if (!dataframe) {
      return { rows: [], columns: [] };
    }

    return toDataGrid(dataframe, {
      pinnedColumns,
      onPinnedColumnsChange: setPinnedColumns,
    });
  }, [dataframe, pinnedColumns, setPinnedColumns]);

  if (gridData.columns.length === 0) {
    return <Center height="100%">No data</Center>;
  }

  return (
    <Flex direction="column" backgroundColor="rgb(249, 249, 249)">
      {onAddToChecklist && (
        <Flex
          borderBottom="1px solid lightgray"
          justifyContent="flex-end"
          gap="5px"
          height="32px"
        >
          <Tooltip label="Add to Checklist">
            <IconButton
              variant="unstyled"
              size="sm"
              aria-label="Add"
              icon={<AddIcon />}
              onClick={() => onAddToChecklist(run)}
            />
          </Tooltip>
        </Flex>
      )}
      <ScreenshotDataGrid
        style={{ blockSize: "auto", maxHeight: "100%", overflow: "auto" }}
        columns={gridData.columns}
        rows={gridData.rows}
        defaultColumnOptions={{ resizable: true, maxWidth: 800, minWidth: 35 }}
        className="rdg-light"
        enableScreenshot={true}
      />
    </Flex>
  );
};

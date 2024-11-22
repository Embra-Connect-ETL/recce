import { Run } from "@/lib/api/types";
import { ValueDiffResult } from "@/lib/api/valuediff";
import { ExternalLinkIcon, InfoIcon, WarningIcon } from "@chakra-ui/icons";
import {
  Box,
  CircularProgress,
  Flex,
  Link,
  SkeletonText,
  Tag,
  TagLabel,
  Tooltip,
} from "@chakra-ui/react";
import { LineageGraphNode } from "./lineage";
import { RowCountDiffResult } from "@/lib/api/rowcount";
import { ModelRowCount, RowCountTag } from "./NodeTag";

interface ActionTagProps {
  node: LineageGraphNode;
  action: Required<LineageGraphNode>["action"];
}

export const ActionTag = ({ node, action }: ActionTagProps) => {
  const { status, skipReason, run } = action;

  if (status === "pending") {
    return <CircularProgress size="20px" value={0} />;
  }

  if (status === "skipped") {
    return (
      <Flex fontSize="10pt" color="gray">
        <Box>Skipped</Box>
        {skipReason && (
          <Tooltip label={skipReason}>
            <InfoIcon />
          </Tooltip>
        )}
      </Flex>
    );
  }

  if (!run) {
    return <CircularProgress isIndeterminate size="20px" />;
  }

  const { error, result, run_id, progress } = run;
  if (status === "running") {
    if (progress?.percentage === undefined) {
      return <CircularProgress isIndeterminate size="20px" />;
    } else {
      return (
        <CircularProgress size="20px" value={progress?.percentage * 100} />
      );
    }
  }

  if (error) {
    return (
      <Flex fontSize="10pt" color="gray">
        <Box>Error</Box>
        {skipReason && (
          <Tooltip label={error}>
            <WarningIcon />
          </Tooltip>
        )}
      </Flex>
    );
  }

  if (run.type === "value_diff") {
    const r = result as ValueDiffResult;
    let total = 0;
    let mismatched = 0;

    for (const c of r.data.data) {
      if ((c[2] as number) < 1) {
        mismatched++;
      }
      total++;
    }

    return (
      <Tag backgroundColor={mismatched > 0 ? "red.100" : "green.100"}>
        <TagLabel>
          <Flex
            fontSize="10pt"
            color={mismatched > 0 ? "red" : "green"}
            alignItems="center"
            gap="3px"
          >
            {mismatched > 0
              ? `${mismatched} columns mismatched`
              : "All columns match"}
          </Flex>
        </TagLabel>
      </Tag>
    );
  }

  if (run.type === "row_count_diff") {
    const result = run.result as RowCountDiffResult;
    return <RowCountTag rowCount={result[node.name]} node={node} />;
  }

  return <>{run_id}</>;
};

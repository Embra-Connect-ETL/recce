import _ from "lodash";
import { axiosClient } from "./axiosClient";
import { Run, RunType } from "./types";

export interface Check<PT = any, RT = any, VO = any> {
  check_id: string;
  name: string;
  description?: string;
  type: RunType;
  params?: PT;
  view_options?: VO;
  is_checked?: boolean;
  last_run?: Run<PT, RT>;
}

export interface LoadedChecks {
  runs: number;
  checks: number;
}

export async function createSimpleCheck(): Promise<Check> {
  const response = await axiosClient.post("/api/checks", {
    type: "simple",
  });
  const check = response.data;

  return check;
}

export async function createLineageDiffCheck(viewMode: string, nodeIds: string[]): Promise<Check> {
  const response = await axiosClient.post("/api/checks", {
    type: "lineage_diff",
    params: {
      view_mode: viewMode,
      node_ids: nodeIds,
    },
  });
  const check = response.data;

  return check;
}

export async function createCheckByNodeSchema(nodeId: string): Promise<Check> {
  const response = await axiosClient.post("/api/checks", {
    type: "schema_diff",
    params: {
      node_id: nodeId,
    },
  });
  const check = response.data;

  return check;
}

export async function createCheckByRun(
  runId: string,
  viewOptions?: any
): Promise<Check> {
  const response = await axiosClient.post("/api/checks", {
    run_id: runId,
    view_options: viewOptions,
  });
  const check = response.data;

  return check;
}

export async function listChecks(): Promise<Check[]> {
  const response = await axiosClient.get("/api/checks");
  return response.data;
}

export async function getCheck(checkId: string): Promise<Check> {
  const response = await axiosClient.get(`/api/checks/${checkId}`);
  return response.data;
}

export async function updateCheck(
  checkId: string,
  payload: Partial<Check>
): Promise<Check> {
  const response = await axiosClient.patch(`/api/checks/${checkId}`, payload);
  return response.data;
}

export async function deleteCheck(checkId: string) {
  const response = await axiosClient.delete(`/api/checks/${checkId}`);
  return response.data;
}

export async function reorderChecks(order: {
  source: number;
  destination: number;
}) {
  return await axiosClient.post("/api/checks/reorder", order);
}

export async function exportChecks(): Promise<string> {
    const response = await axiosClient.post("/api/checks/export");
    return response.data;
}

export async function loadChecks(file: File): Promise<LoadedChecks> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosClient.post("/api/checks/load", formData);
  return response.data;
}

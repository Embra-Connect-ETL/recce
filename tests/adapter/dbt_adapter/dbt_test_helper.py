import os
import textwrap
import uuid
from datetime import datetime
from io import StringIO

from dbt.artifacts.schemas.catalog import CatalogArtifact
from dbt.contracts.graph.nodes import ModelNode, SnapshotNode
from dbt_common.contracts.metadata import ColumnMetadata, CatalogTable, TableMetadata

from recce.adapter.dbt_adapter import DbtAdapter, as_manifest, load_manifest
from recce.core import RecceContext


class DbtTestHelper:

    def __init__(self):
        schema_prefix = "schema_" + uuid.uuid4().hex
        self.base_schema = f"{schema_prefix}_base"
        self.curr_schema = f"{schema_prefix}_curr"

        current_dir = os.path.dirname(os.path.abspath(__file__))
        project_dir = os.path.join(current_dir, 'test_proj')
        profiles_dir = project_dir
        manifest_path = os.path.join(project_dir, 'manifest.json')

        dbt_adapter = DbtAdapter.load(
            no_artifacts=True,
            project_dir=project_dir,
            profiles_dir=profiles_dir,
        )

        context = RecceContext()
        context.adapter_type = 'dbt'
        context.adapter = dbt_adapter
        context.schema_prefix = schema_prefix
        self.adapter = dbt_adapter
        self.context = context
        curr_writable_manifest = load_manifest(manifest_path)
        base_writable_manifest = load_manifest(manifest_path)

        self.curr_manifest = as_manifest(curr_writable_manifest)
        self.base_manifest = as_manifest(base_writable_manifest)
        now = datetime.now()
        self.curr_catalog = CatalogArtifact.from_results(
            generated_at=now,
            nodes={},
            sources={},
            compile_results=None,
            errors=None,
        )
        self.base_catalog = CatalogArtifact.from_results(
            generated_at=now,
            nodes={},
            sources={},
            compile_results=None,
            errors=None,
        )
        self.context = context

        self.adapter.execute(f"CREATE schema IF NOT EXISTS {self.base_schema}")
        self.adapter.execute(f"CREATE schema IF NOT EXISTS {self.curr_schema}")
        self.adapter.set_artifacts(
            base_writable_manifest,
            curr_writable_manifest,
            self.curr_manifest,
            self.base_manifest,
            self.base_catalog,
            self.curr_catalog,
        )

    def create_model(
        self,
        model_name,
        base_csv=None,
        curr_csv=None,
        base_sql=None,
        curr_sql=None,
        depends_on=[],
        disabled=False,
        unique_id=None,
        package_name="recce_test",
        base_columns: dict[str, str] = None,
        curr_columns: dict[str, str] = None,
    ):
        # unique_id = f"model.{package_name}.{model_name}"
        unique_id = unique_id if unique_id else model_name

        def _add_model_to_manifest(base, raw_code):
            if base:
                schema = self.base_schema
                manifest = self.base_manifest
                catalog = self.base_catalog
            else:
                schema = self.curr_schema
                manifest = self.curr_manifest
                catalog = self.curr_catalog

            node = ModelNode.from_dict({
                "resource_type": "model",
                "name": model_name,
                "package_name": package_name,
                "path": "",
                "original_file_path": "",
                "unique_id": unique_id,
                "fqn": [
                    package_name,
                    model_name,
                ],
                "schema": schema,
                "alias": model_name,
                "checksum": {
                    "name": "sha256",
                    "checksum": hash(raw_code),
                },
                "raw_code": raw_code,
                "config": {
                    "materialized": "table",
                    "tags": ["test_tag"],
                },
                "tags": ["test_tag"],
                "depends_on": {
                    "nodes": depends_on
                },
            })

            if disabled:
                manifest.add_disabled_nofile(node)
            else:
                manifest.add_node_nofile(node)
            return node

        dbt_adapter = self.adapter
        with dbt_adapter.connection_named('create model'):
            import pandas as pd
            if base_csv or base_sql:
                if base_csv:
                    base_csv = textwrap.dedent(base_csv)
                    df_base = pd.read_csv(StringIO(base_csv))
                    dbt_adapter.execute(f"CREATE TABLE {self.base_schema}.{model_name} AS SELECT * FROM df_base")
                _add_model_to_manifest(True, base_sql if base_sql else base_csv)

            if curr_csv or curr_sql:
                if curr_csv:
                    curr_csv = textwrap.dedent(curr_csv)
                    df_curr = pd.read_csv(StringIO(curr_csv))
                    dbt_adapter.execute(f"CREATE TABLE {self.curr_schema}.{model_name} AS SELECT * FROM df_curr")
                _add_model_to_manifest(False, curr_sql if curr_sql else curr_csv)

                if curr_columns:
                    index = 1
                    table = CatalogTable(
                        TableMetadata(type="BASE TABLE", schema=self.curr_schema, name=model_name),
                        {}, {})
                    self.curr_catalog.nodes[unique_id] = table
                    for column, column_type in curr_columns.items():
                        col_data = ColumnMetadata(type=column_type, index=index, name=column)
                        self.curr_catalog.nodes[unique_id].columns[column] = col_data
                        index = index + 1

        self.adapter.set_artifacts(
            self.base_manifest.writable_manifest(),
            self.curr_manifest.writable_manifest(),
            self.curr_manifest,
            self.base_manifest,
            self.base_catalog,
            self.curr_catalog)

    def remove_model(self, model_name):
        dbt_adapter = self.adapter
        with dbt_adapter.connection_named('cleanup'):
            dbt_adapter.execute(f"DROP TABLE IF EXISTS {self.base_schema}.{model_name}")
            dbt_adapter.execute(f"DROP TABLE IF EXISTS {self.curr_schema}.{model_name} ")

    def cleanup(self):
        dbt_adapter = self.adapter
        with dbt_adapter.connection_named('cleanup'):
            dbt_adapter.execute(f"DROP SCHEMA IF EXISTS {self.base_schema} CASCADE")
            dbt_adapter.execute(f"DROP SCHEMA IF EXISTS {self.curr_schema} CASCADE")

    def create_snapshot(self, sanpshot_name, base_csv, curr_csv, depends_on=[]):
        package_name = "recce_test"
        # unique_id = f"model.{package_name}.{model_name}"
        unique_id = sanpshot_name

        def _add_snapshot_to_manifest(base, raw_code):
            if base:
                schema = self.base_schema
                manifest = self.base_manifest
            else:
                schema = self.curr_schema
                manifest = self.curr_manifest

            node = SnapshotNode.from_dict({
                "resource_type": "snapshot",
                "name": sanpshot_name,
                "package_name": package_name,
                "path": "",
                "original_file_path": "",
                "unique_id": unique_id,
                "fqn": [
                    package_name,
                    sanpshot_name,
                ],
                "schema": schema,
                "alias": sanpshot_name,
                "checksum": {
                    "name": "sha256",
                    "checksum": hash(raw_code),
                },
                "raw_code": raw_code,
                "config": {
                    "materialized": "snapshot",
                    "tags": ["test_tag"],
                },
                "tags": ["test_tag"],
                "depends_on": {
                    "nodes": depends_on
                },
            })
            manifest.add_node_nofile(node)
            return node

        base_csv = textwrap.dedent(base_csv)
        curr_csv = textwrap.dedent(curr_csv)

        _add_snapshot_to_manifest(True, base_csv)
        _add_snapshot_to_manifest(False, curr_csv)

        import pandas as pd
        df_base = pd.read_csv(StringIO(base_csv))
        df_curr = pd.read_csv(StringIO(curr_csv))
        dbt_adapter = self.adapter
        with dbt_adapter.connection_named('create model'):
            dbt_adapter.execute(f"CREATE TABLE {self.base_schema}.{sanpshot_name} AS SELECT * FROM df_base")
            dbt_adapter.execute(f"CREATE TABLE {self.curr_schema}.{sanpshot_name} AS SELECT * FROM df_curr")
        self.adapter.set_artifacts(
            self.base_manifest.writable_manifest(),
            self.curr_manifest.writable_manifest(),
            self.curr_manifest,
            self.base_manifest,
            self.base_catalog,
            self.curr_catalog)

    def remove_snapshot(self, snapshot_name):
        dbt_adapter = self.adapter
        with dbt_adapter.connection_named('cleanup'):
            dbt_adapter.execute(f"DROP TABLE IF EXISTS {self.base_schema}.{snapshot_name}")
            dbt_adapter.execute(f"DROP TABLE IF EXISTS {self.curr_schema}.{snapshot_name} ")

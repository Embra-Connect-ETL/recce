# Configuration file for recce
from rich.console import Console

from recce import yaml
from recce.exceptions import RecceConfigException
from recce.util import SingletonMeta

RECCE_CONFIG_FILE = 'recce.yml'
RECCE_PRESET_CHECK_COMMENT = '''Preset Checks
Please see https://datarecce.io/docs/features/preset-checks/
'''
RECCE_ERROR_LOG_FILE = 'recce_error.log'
console = Console()


class RecceConfig(metaclass=SingletonMeta):
    def __init__(self, config_file=RECCE_CONFIG_FILE):
        self.config_file = config_file
        self.config = None
        self.load()

    def load(self):
        try:
            with open(self.config_file, 'r') as f:
                self.config = yaml.safe_load(f)
            self._verify_preset_checks()
        except FileNotFoundError:
            console.print(f'Recce config file not found. Generating default config file at \'{self.config_file}\'')
            self.config = self.generate_template()
            self.save()

    def _verify_preset_checks(self):
        from recce.tasks.core import CheckValidator

        if 'checks' not in self.config:
            return

        for check in self.config['checks']:
            try:
                check_type = check.get('type')
                if check_type is None:
                    raise ValueError(f'Check type is required for check "{check}"')
                if check_type == 'linage_diff' or check_type == 'schema_diff':
                    validator = CheckValidator()
                else:
                    validator = CheckValidator()
                validator.validate(check)
            except Exception as e:
                raise RecceConfigException(f'Load preset check failed from "{self.config_file}"\n{check}', cause=e)

    def generate_template(self):
        data = yaml.CommentedMap(
            checks=yaml.CommentedSeq())
        data.yaml_set_comment_before_after_key('checks', before=RECCE_PRESET_CHECK_COMMENT)
        # Define default preset checks
        default_checks = [
            yaml.CommentedMap(
                name='Row count diff',
                description='Check the row count diff for all table models.',
                type='row_count_diff',
                params={'select': 'state:modified,config.materialized:table'},
            ),
            yaml.CommentedMap(
                name='Schema diff',
                description='Check the schema diff for all nodes.',
                type='schema_diff',
            )
        ]

        for check in default_checks:
            data['checks'].append(check)

        return data

    def get(self, key, default=None):
        return self.config.get(key, default)

    def set(self, key, value):
        self.config[key] = value

    def save(self):
        with open(RECCE_CONFIG_FILE, 'w') as f:
            yaml.dump(self.config, f)

    def __str__(self):
        return yaml.dump(self.config)

    def __repr__(self):
        return self.__str__()

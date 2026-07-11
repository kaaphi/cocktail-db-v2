"""
This script converts all the non-archived YAML cocktail recipes into a single JSON object with the cocktail name as the
key. The JSON object can then be used in a React app.
"""
from pathlib import Path

from pydantic import TypeAdapter
from ruamel.yaml import YAML

from models import YamlCocktail, JsonCocktail, safe_file_name


def main():
    cocktail_dir = Path(__file__).parent / "data"

    cocktails: dict[str, JsonCocktail] = {}

    yaml = YAML(typ='safe')
    for yaml_cocktail_file in cocktail_dir.glob("*.yaml"):
        with open(yaml_cocktail_file, "rb") as f:
            data = yaml.load(f)

        yaml_cocktail = YamlCocktail.model_validate(data)
        cocktails[safe_file_name(yaml_cocktail.name)] = yaml_cocktail.to_json()

    adapter = TypeAdapter(dict[str, JsonCocktail])

    output_file = Path(__file__).parent.parent / "cocktail-ui" / "src" / "data" / "cocktails.json"

    with open(output_file, "wb") as f:
        f.write(adapter.dump_json(cocktails, indent=2))



if __name__ == "__main__":
    main()

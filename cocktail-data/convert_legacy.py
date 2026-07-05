"""
This script converts legacy v1 JSON format for cocktails to human-readable and human-editable YAML files.
"""
from pathlib import Path

from pydantic import TypeAdapter

from models import LegacyJsonCocktail, safe_file_name


def main():
    file = Path(__file__).parent / "data/legacy/prod_data.json"
    json_data: str = file.read_text(encoding="utf-8")

    adapter = TypeAdapter(list[LegacyJsonCocktail])

    cocktails = adapter.validate_json(json_data)

    for cocktail in cocktails:
        filename = f"{safe_file_name(cocktail.name)}.yaml"
        if not cocktail.archived:
            path = Path(__file__).parent / "data"/ filename
        else:
            path = Path(__file__).parent / "data" / "archive" / filename
        with open(path, "wb") as out:
            cocktail.to_yaml_cocktail().to_yaml(stream=out)



if __name__ == "__main__":
    main()

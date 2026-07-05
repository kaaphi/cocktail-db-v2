import re
from typing import Any

import unicodedata
from pydantic import BaseModel
from ruamel.yaml import CommentedSeq, CommentedMap, YAML

type YamlRecipeElement = tuple[str|int, str, str]|tuple[str|int, str, str, YamlElementMeta]

def yaml_recipe_element_to_json_element(e: YamlRecipeElement) -> JsonRecipeElement:
    if len(e) == 4:
        amount, unit, ingredient, m = e
        return JsonRecipeElement(amount=amount, unit=unit, ingredient=ingredient, note=m.note, isBase=m.isBase)
    else:
        amount, unit, ingredient = e
        return JsonRecipeElement(amount=amount, unit=unit, ingredient=ingredient)


def from_fraction_tuple(frac: tuple[int, int]) -> str:
    if frac[0] == 0:
        return "0"

    quotient, remainder = divmod(*frac)
    if quotient > 0:
        if remainder > 0:
            return f"{quotient} {remainder}/{frac[1]}"
        else:
            return str(quotient)
    else:
        return f"{frac[0]}/{frac[1]}"


class LegacyJsonRecipeElement(BaseModel):
    amount: tuple[int, int]
    unit: str
    ingredient: str
    note: str|None = None
    isBase: bool = False

    def to_yaml_element(self) -> YamlRecipeElement:
        note = self.note or None

        if not note and not self.isBase:
            return from_fraction_tuple(self.amount), self.unit, self.ingredient
        else:
            return from_fraction_tuple(self.amount), self.unit, self.ingredient, YamlElementMeta(note=note,isBase=self.isBase)


class LegacyJsonCocktail(BaseModel):
    name: str
    instructions: str = ""
    reference: str|None = None
    referenceDetail: str|None = None
    note: str|None = None
    indexElements: bool = True
    tags: list[str] = []
    archived: bool = False
    recipeElements: list[LegacyJsonRecipeElement] = []

    def to_yaml_cocktail(self) -> YamlCocktail:
        return YamlCocktail(name=self.name, instructions=self.instructions, reference=self.reference or None, referenceDetail=self.referenceDetail or None, note=self.note or None, indexElements=self.indexElements, tags=self.tags,
                            recipeElements=[e.to_yaml_element() for e in self.recipeElements])



class YamlElementMeta(BaseModel):
    note: str | None = None
    isBase: bool = False

class YamlCocktail(BaseModel):
    name: str
    recipeElements: list[YamlRecipeElement] = []
    instructions: str = ""
    reference: str|None = None
    referenceDetail: str|None = None
    note: str|None = None
    indexElements: bool = True
    tags: list[str] = []

    def to_yaml(self, stream : Any):
        raw_data = self.model_dump(exclude_defaults=True)

        elements = []
        for element_tuple in raw_data["recipeElements"]:
            item = CommentedSeq(element_tuple[0:3])
            item.fa.set_flow_style()
            if len(element_tuple) == 4:
                metadata = CommentedMap(element_tuple[3])
                metadata.fa.set_flow_style()
                item.append(metadata)

            elements.append(item)

        raw_data["recipeElements"] = elements
        if "tags" in raw_data:
            raw_data["tags"] = CommentedSeq(raw_data["tags"])
            raw_data["tags"].fa.set_flow_style()

        yaml_ready_data = CommentedMap(raw_data)

        yaml = YAML()
        yaml.default_flow_style = False
        yaml.dump(yaml_ready_data, stream)

    def to_json(self) -> JsonCocktail:
        return JsonCocktail(name=self.name, instructions=self.instructions, reference=self.reference, referenceDetail=self.referenceDetail, note=self.note, indexElements=self.indexElements, tags=self.tags,
                            recipeElements=[yaml_recipe_element_to_json_element(e) for e in self.recipeElements])

class JsonRecipeElement(BaseModel):
    amount: str
    unit: str
    ingredient: str
    note: str|None = None
    isBase: bool = False

class JsonCocktail(BaseModel):
    name: str
    instructions: str = ""
    reference: str|None = None
    referenceDetail: str|None = None
    note: str|None = None
    indexElements: bool = True
    tags: list[str] = []
    recipeElements: list[JsonRecipeElement] = []

def safe_file_name(value: str) -> str:
    # Convert accented unicode characters to their ASCII equivalent
    value = unicodedata.normalize('NFKD', value).encode('ascii', 'ignore').decode('ascii')
    # Remove everything except alphanumeric characters, underscores, and hyphens
    value = re.sub(r'[^\w\s-]', '', value).strip().lower()
    # Replace whitespace/hyphens with a single hyphen
    return re.sub(r'[-\s]+', '-', value)
import type React from "react";

interface AttributeValue {
	id: number;
	value: string;
}

interface Attribute {
	id: number;
	name: string;
	values: AttributeValue[];
}

interface AttributeSelectorProps {
	attributes: Attribute[];
	selectedAttributes: VariantAttributes[];
	onChange: (variantIndex: number, attributeId: number, value: number) => void;
}

interface VariantAttributes {
	[attributeId: number]: number; // Mapping attribute ID to attribute value ID
}

const AttributeSelector: React.FC<AttributeSelectorProps> = ({
	attributes,
	selectedAttributes,
	onChange,
}) => {
	return (
		<div>
			{attributes.map((attribute, attrIndex) => (
				<div key={attribute.id} className="field">
					<label className="label">{attribute.name}</label>
					<div className="control">
						{selectedAttributes.map((variantAttr, variantIndex) => (
							<div key={variantIndex} className="select is-fullwidth">
								<select
									value={variantAttr[attribute.id] || ""}
									onChange={(e) => {
										const value =
											e.target.value === "" ? "" : Number(e.target.value);
										onChange(variantIndex, attribute.id, value);
									}}
								>
									<option value="">Sélectionnez une valeur</option>
									{attribute.values.map((val) => (
										<option key={val.id} value={val.id}>
											{val.value}
										</option>
									))}
								</select>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default AttributeSelector;

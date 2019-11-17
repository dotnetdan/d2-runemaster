// https://yetawf.com/BlogEntry/Title/TypeScript%20and%20JSX%20without%20React/?BlogEntry=1034
// https://www.meziantou.net/write-your-own-dom-element-factory-for-typescript.htm
export function createElement(tag: string, attributes: AttributeCollection, ...children: any[]): HTMLElement {
	const element = document.createElement(tag);

	if (attributes) {
		for (const name of Object.keys(attributes)) {
			const value = attributes[name];

			switch (typeof value) {
				case "boolean": 
					// <div xyz=true></div>
					if (value) { element.setAttribute(name, ""); }
					break;
				case "string":
					element.setAttribute(name, value);
					break;
				case "function":
					element.addEventListener(name, value);
					break;
				default:
					const _: never = value;
			}
		}
	}

	for (const child of children) {
		element.appendChild(child.nodeType == null ?
			document.createTextNode(child.toString()) : child);
	}
	return element;
}

interface AttributeCollection {
	[name: string]: string | boolean | EventListener;
}
// https://yetawf.com/BlogEntry/Title/TypeScript%20and%20JSX%20without%20React/?BlogEntry=1034
export function createElement(tag: string, attrs: any, children: any): HTMLElement {
	var element: HTMLElement = document.createElement(tag);
	for (let name in attrs) {
		if (name && attrs.hasOwnProperty(name)) {
			var value: string | null | boolean = attrs[name];
			if (value === true) {
				element.setAttribute(name, name);
			}
			else if (value !== false && value != null) {
				element.setAttribute(name, value.toString());
			}
		}
	}
	for (let i: number = 2; i < arguments.length; i++) {
		let child: any = arguments[i];
		element.appendChild(child.nodeType == null ?
			document.createTextNode(child.toString()) : child);
	}
	return element;
}
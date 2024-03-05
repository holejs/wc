export function getDataAttributes (element: HTMLElement) {
  const attrMap = new Map<string, string>()

  for (const attribute of element.attributes) {
    if (attribute.name.startsWith('data-')) {
      attrMap.set(attribute.name, attribute.value)
    }
  }

  return attrMap
}

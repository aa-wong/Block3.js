const XMLParser = (node) => {
  let data = {};

  const add = (name, value) => {
    if (data[name]) {
      if (data[name].constructor !== Array) data[name] = [data[name]];
      data[name][data[name].length] = value;
    } else data[name] = value;
  };

	// element attributes
	let c, cn;
	for (c = 0; cn = node.attributes[c]; ++c) add(cn.name, cn.value);

	// child elements
	for (c = 0; cn = node.childNodes[c]; c++) {
		if (cn.nodeType == 1) {
			if (cn.childNodes.length == 1 && cn.firstChild.nodeType == 3) add(cn.nodeName, cn.firstChild.nodeValue);
			else add(cn.nodeName, XMLParser(cn));
		}
	}

	return data;
}

export default XMLParser;

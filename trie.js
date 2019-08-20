module.exports = class trieNode {
  constructor(value) {
	this.children = {};
	this.value = value;
  }
  find(key) {
	key = key.toLowerCase();
	var tmp = this;
	for (var i = 0; i < key.length; i++)
	{
  		if (tmp.children[key[i]])
			tmp = tmp.children[key[i]]
  		else
			return ([]);
  	}
	var arr = [];
	(function recursive(node)
	{
		if (node.value && node.value.name.toLowerCase() != key)
			arr.push(node.value)
		for (var i in node.children)
			recursive(node.children[i])
	})(tmp);
	arr.sort((a, b) => b.times - a.times);
	if (tmp.value)
		arr.unshift(tmp.value)
  	return (arr.slice(0, process.env.SUGGESTION_NUMBER));
  }
  insert(key, value)
  {
	  key = key.toLowerCase();
	  var tmp = this;
	  key.split('').forEach(char => {
	 	 if (!(tmp.children[char]))
	 		 tmp.children[char] = new trieNode();
	 	 tmp = tmp.children[char]
	  })
	  tmp.value = value;
  }
}

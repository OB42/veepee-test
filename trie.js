module.exports = class trieNode {
  constructor(value) {
	this.children = {};
	this.value = value;
  }
  find(key) {
	var tmp = this;
  	key.split('').forEach(char => {
  		if (tmp.children[char])
  			tmp = tmp.children[char]
  		else
  			return ;
  	})
  	return (tmp.value);
  }
  insert(key, value)
  {
	  var tmp = this;
	  key.split('').forEach(char => {
	 	 if (!(tmp.children[char]))
	 		 tmp.children[char] = new trieNode();
	 	 tmp = tmp.children[char]
	  })
	  tmp.value = value;
  }
}

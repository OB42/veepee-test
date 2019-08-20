const app = require('express')();
module.exports = app;//exporting the express server for unit tests
const bodyParser = require('body-parser');
const Trie = require('./trie.js');

//turning the data into a prefix tree(trie)
var tmp = require(`${__dirname}/${process.env.NAMES_FILE || "names.json"}`);
var tree = new Trie();
var data = {};
for (name in tmp)
{
	data[name.toLowerCase()] = {name, times: tmp[name]}
	tree.insert(name, data[name.toLowerCase()]);
}

app
.use(bodyParser.json())
.post('/typeahead/set', function (req, res) {
	//checking for bad requests
	if (!req.body || typeof req.body.name === "undefined"
	|| typeof data[req.body.name.toLowerCase()] === "undefined")
	{
		res.status(400)
		res.end('')
	}
	else {
		data[req.body.name.toLowerCase()].times++;
		res.status(200);
		res.end(JSON.stringify(data[req.body.name.toLowerCase()]));
	}
})
.get(/\/typeahead\/(.*)/, function (req, res) {
	var prefix = req.params[0]
	res.setHeader('Content-Type', 'application/json');
	res.status(200);
	res.end(JSON.stringify(tree.find(prefix)));
})
app.listen(process.env.PORT || 8080);

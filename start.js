const app = require('express')();
module.exports = app;
const bodyParser = require('body-parser');
const Trie = require('./trie.js');
var tree = new Trie();
var data = {};
var tmp = require(`${__dirname}/${process.env.NAMES_FILE || "names.json"}`);
for (name in tmp)
{
	data[name.toLowerCase()] = {name, times: tmp[name]}
	tree.insert(name, data[name.toLowerCase()]);
}

app.use(bodyParser.json())
.post('/typeahead/set', function (req, res) {
	if (req.body && typeof req.body.name !== "undefined"
	&& typeof data[req.body.name.toLowerCase()] !== "undefined")
	{
		data[req.body.name.toLowerCase()].times++;
		res.status(200);
		res.end(JSON.stringify(data[req.body.name.toLowerCase()]));
	}
	else {
		res.status(400)
		res.end('')
	}
})
.get('/typeahead/:prefix', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
	res.status(200);
	res.end(JSON.stringify(tree.find(req.params.prefix)));
})
.get('/typeahead/', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.status(200);
	res.end(JSON.stringify(tree.find('')));
});
app.listen(process.env.PORT || 8080);

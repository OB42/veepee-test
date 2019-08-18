const app = require('express')();
const bodyParser = require('body-parser');
var tree = require('./trie.js')
var data = {};
var tmp = require(`${__dirname}/${process.env.NAMES_FILE || "names.json"}`);

for (name in tmp)
{
	data[name.toLowerCase()] = {name, times: tmp[name]}
}
app.use(bodyParser.json())
.post('/typeahead/set', function (req, res) {
	if (req.body && typeof req.body.name !== "undefined"
	&& typeof data[req.body.name.toLowerCase()] !== "undefined")
	{
		data[req.body.name.toLowerCase()].times++;
		res.status(200);
	}
	else {
		res.status(400)
	}
	res.end();
})
.get('/typeahead/:prefix', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
	res.status(200);
	res.end('[]');
})
.get('/typeahead/', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.status(200);
	res.end('[]');
});
app.listen(process.env.PORT || 8080);

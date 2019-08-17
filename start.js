const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json())
.post('/typeahead/set', function (req, res) {
	res.end();
})
.get('/typeahead/:prefix', function (req, res) {
	res.end();
});

app.listen(process.env.PORT || 8080);

# test-nodejs

### Installation

### Requires [Node.js](https://nodejs.org/) v14.15.1 to run.
### Requires [PostgreSQL](https://www.postgresql.org/download/) v13.1-1 to run.

Install the dependencies and devDependencies.

```sh
$ cd test-nodejs/
$ npm install
```
Edit .env file to Change database configuration.
```sh
$ nano .env 
```
Database preparation and seeding...
```sh
$ npm run prepare_db
```

### Development

Running development server
```sh
$ npm start
```

### Endpoints
#### 1. localhost/klikdaily/stock
    * Method : GET
    * Request Params : Same  as in PDF File
    * Response Body : Same as in PDF File
#### 2. localhost/klikdaily/adjustment
    * Method : POST
    * Request Params : Same  as in PDF File
    * Response Body : Same as in PDF File
#### 3. localhost/klikdaily/logs/{ location_id }
    * Method : GET
    * Request Params : With or without query params (localhost/klikdaily/logs/3?product="Indomie")
    * Response Body : Same as in PDF File

### Additional
If you cant do database migrations correctly, import this.
SQL Dump file :
https://dl.dropbox.com/s/34uu4vv3c0opgz8/test-db?dl=0

   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>

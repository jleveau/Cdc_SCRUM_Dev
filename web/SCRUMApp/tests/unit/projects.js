require('mocha');

var should = require('should');
var mecano = require('mecano');
var routes = require('../../controllers/projects')



describe("add a project", function(){
    it("add a project in the database", function(){

        var request = {};

        var response = {
            viewName: ""
            , data : {}
            , render: function(view, viewData) {
                viewName = view;
                data = viewData;
            }
        };

        routes.addproject(req,res);
        // TODO
    });

});
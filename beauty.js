module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getReviews(res, mysql, context, complete){
        mysql.pool.query("SELECT id, name, comment FROM reviews", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.reviews  = results;
            complete();
        });
    }

    function getProducts(res, mysql, context, complete){
        mysql.pool.query("SELECT products.id, name, brand, category, description, ingredient FROM products", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.products = results;
            complete();
        });
    }

    function getProduct(res, mysql, context, id, complete){
        var sql = "SELECT id, name, brand, category, description, ingredient, comment FROM products WHERE id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.product = results[0];
            complete();
        });
    }

    /*Display all people. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        // var callbackCount = 0;
        var context = {};
        // context.jsscripts = ["deleteperson.js"];
        var mysql = req.app.get('mysql');
        getProducts(res, mysql, context, complete);
        // getReviews(res, mysql, context, complete);
        function complete(){
            // callbackCount++;
            // if(callbackCount >= 2){
                res.render('products', context);
            // }

        }
    });

    /* Display one person for the specific purpose of updating people */



    /* Adds a person, redirects to the people page after adding */



    /* The URI that update data is sent to in order to update a person */



    /* Route to delete a person, simply returns a 202 upon success. Ajax will handle this. */



    return router;
}();
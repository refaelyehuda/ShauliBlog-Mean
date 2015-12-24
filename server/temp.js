/**
 * Created by refael yehuda on 12/25/2015.
 */

/**
 * Created by Itzik on 12/12/2015.
 */

var express = require('express');
var router = express.Router();

router.param('id', function (req, res, next, id) {
    console.log('GOT screen id %s',id);
    req.id=id;
    if (id in {"1":true,"2":true,"3":true})
    {
        next();
    }
    else
    {
        res.sendStatus(403);
    }
});

function get_items_for_screen(news, screen_id) {
    var list = [];
    for (var item = 0; item < news.news_items.length; item++) {
        for (var screen = 0; screen < news.news_items[item].screens.length; screen++) {
            if (news.news_items[item].screens[screen] == screen_id) {
                list.push(news.news_items[item]);
            }
        }
    }
    return list;
}

router.get('/:id', function(req, res) {
    //FIXME This is a synchronous method and will freeze on big files.
    var news_data = require('../news_data.json');
    res.json(get_items_for_screen(news_data,req.id));
});

module.exports = router;
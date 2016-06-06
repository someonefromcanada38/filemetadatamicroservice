var bing = require('bing.search');

module.exports = function(app, history) {
  app.route('/latest')
  .get(historyPoster)
  
  app.get('/:query', searchHandler);
  
  function historyPoster(req,res)
  {

    history.find({}, null, {
      "limit":10,
      "sort": {
        "date": -1,
      }
    },
    function(err,history){
      if (err) return console.error(err);
      res.send(history.map(function(arg){
        return{
          search: arg.search,
          date: arg.date
        };
      }));
  });
  }
  
  function searchHandler(req, res)
  {
    var query = req.params.query;
    var size = req.query.offset || 10;
    //var google = images(process.env.API_KEY, process.env.API_ID);
var searchQuery = {
  "search": query,
  "date": new Date().toLocaleString()
}
var searchResponse = null;
if(query !== 'favicon.ico')
{
  saveHistory(searchQuery);
console.log('searchnow')

var bingsearch = new bing(process.env.IMG_KEY);

    bingsearch.images(query, {
        top: size
      },
      function(err, results) {
        if (err) throw err;
        var send = postResults(results)
        res.send(send);
      }
    );
/*google.search(query)
    .then(function (images) {
      console.log('response: ' +images);
      res.send(images);
    });*/

  /*
google.build({
  q: query,
  fileType: "png",
  num: size, // Number of search results to return between 1 and 10, inclusive 
}, function(error, response) {
  console.log(response);
  res.send(response)
});
*/
}
  }
  
  function postResults(arr)
  {
    console.log("array has arrived: " + arr);
    var post = [];
    for (var i = 0; i < arr.length; i++)
    {
      console.log("posting: " + i);
      post.push(postImages(arr[i]));
    }
    return(post);
  }
  
  function postImages(obj)
  {
    console.log("OBJECT: " + obj);
    return {
      "url": obj.url,
      "snippet": obj.title,
      "thumbnail": obj.thumbnail.url,
      "context": obj.sourceUrl
    };
  }
  
  function saveHistory(search)
  {
    var save = history(search);
    save.save(function(err,history){
      if(err)throw err;
      console.log("saved" + save);
    });
  }
  
};
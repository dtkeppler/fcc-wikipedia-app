$(document).ready(function() {

  var $random = $('#random');
  var $search = $('#search');
  var $clear = $('#clear');
  var $results = $('.results'); 
  var $searchTerm;

  $search.click(function() {
    
    if ($('#search-term').val().length !== 0) {
    
      $searchTerm = $('#search-term').val();
      // use "callback=?" to enable JSONP
      var urlSearch = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + $searchTerm + '&format=json&callback=?'

      // can't use .get() because we need jsonp
      $.ajax({
        url: urlSearch,
        dataType: "json",
        asynch: false,
        success: function(data, textStatus, xhr) {
          $results.empty();
          var articleArr = data.query.search;
          if (articleArr.length > 0) {
            $.each(articleArr, function(index, value) {

              var articleTitle = value.title
              var urlTitle = articleTitle.replace(" ", "_");
              var urlLink = ("https://en.wikipedia.org/wiki/" + urlTitle);  
              
              $results.append('<div class="result"></div>')
                .append('<a href="' + urlLink + '" target="_blank">' + value.title + '</a><br>')
                .append(value.snippet + '<br><hr>');
            
            }); // end .each
            console.log(articleArr)
          } else {
            $results.append('<p>Sorry, no results found!</p>');
          }  // end "print each article"
        },
        error: function(jqXHR, textStatus, errorThrown) {
          $results.empty();
          $results.append('<p>Sorry, there was a problem retrieving your results: ' + jqXHR.responseText + ' ' + textStatus + '</p>');
        }
      }); // end ajax call
      
    } else {
      $results.empty().append('<p>Please enter a search word!</p>');
    } // end "if search empty"

  });  // end "search" click
  
  $clear.click(function () {
    
    $('#search-term').val("");
    $results.empty();
    
  })
  
  $random.click(function() {
    
    var urlRand = 'https://en.wikipedia.org/wiki/Special:Random';
    window.open(urlRand);
    
    
  }); // end "random" click
  
  
});
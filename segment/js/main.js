/* Main page dispatcher.
*/
requirejs(['app/index',
 'app/edit',
 'helper/colormap',
 'helper/util'],
 function(indexPage, editPage, colormap, util) {

   var dataURL = "data/data.json", 
   params = util.getQueryParams();



  // Create a colormap for display. The following is an example.
  function createColormap(label, labels) {
    return (label) ?
    colormap.create("single", {
      size: labels.length,
      index: labels.indexOf(label)
    }) :
    [[255, 255, 255],
    [79, 135, 255],
    [64, 32, 32]].concat(colormap.create("hsv", {
      size: labels.length - 3
    }));
  }

  // Load dataset before rendering a view.
  function renderPage(renderer) {

    util.requestJSON(dataURL, function(data) {
      data.colormap = createColormap(params.label, data.labels);

      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const img_name = urlParams.get('image')
      console.log(img_name);







      var storageRef = firebase.storage().ref("images/");
      var storageRef2 = firebase.storage().ref("annotation/"+img_name);


      storageRef.child(img_name+".jpg").getDownloadURL().then(function(url) {



        console.log(url);
        data.imageURLs = [url];
        

        var username = sessionStorage.getItem("username");
        console.log(username);

        storageRef2.child(img_name+'_'+username+".png").getDownloadURL().then(function(url) {



          console.log(url);
          data.annotationURLs = [url];


          renderer(data, params);



        }).catch(function(error) {
          console.log("Error: " + error.code);
        });




      }).catch(function(error) {
        console.log("Error: " + error.code);
      });











      // data.imageURLs = ['https://firebasestorage.googleapis.com/v0/b/labeljpn.appspot.com/o/images%2Fimg_00001.jpg?alt=media&token=6290cb89-1d9f-4d7a-8572-4bfdbd143598'];
      
    });
  }


  switch(params.view) {
    case "index":
    renderPage(indexPage);
    break;
    case "edit":
    renderPage(editPage);
    break;
    default:
    params.view = "index";
    window.location = util.makeQueryParams(params);
    break;
  }
});

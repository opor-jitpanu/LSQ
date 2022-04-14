/** Index page renderer.
*/
define(["../helper/pagination",
  "../helper/segment-viewer",
  "../helper/util"],
  function(Pagination, Viewer, util) {


    function render(data, params) {

      var user_id = sessionStorage.getItem("user_id");
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const img_name = urlParams.get('image')
      const username = urlParams.get('username')

      console.log(img_name);

      var ref = firebase.database().ref('image/'+img_name);

      var storageRef = firebase.storage().ref("images/");
      var storageRef2 = firebase.storage().ref("annotation/"+img_name);
      storageRef.child(img_name+".jpg").getDownloadURL().then(function(url) {
        console.log(url);

        ref.once("value")
        .then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;





            storageRef2.child(img_name+"_"+key+"_"+username+".png").getDownloadURL().then(onResolve, onReject);

            function onReject(error) {
              console.log("HAVE");
              if (key == 'upload') {}

                else{
                 storageRef2.child(img_name+"_"+key+".png").getDownloadURL().then(function(url2) {
                  console.log(url2);
                  console.log("Image label by", key);

                  var viewer = new Viewer(url, url2, {
                    width: (params.width || 240),
                    height: (params.height || 320),
                    colormap: data.colormap,
                    overlay: key.toString()
                  }),
                  anchor = document.createElement("a");
                  anchor.appendChild(viewer.container);
                  anchor.href = '../vertify/index.html?view=edit&id=0&image='+img_name+'&user_id='+key;

                  document.body.appendChild(anchor);           
                  document.getElementById('lc').appendChild(anchor); 

                }).catch(function(error) {
                  console.log("Error: " + error);
                });

              }
            }

            function onResolve(foundURL) {
              console.log("NO HAVE");
              if (key == 'upload') {}

                else{
                 storageRef2.child(img_name+"_"+key+".png").getDownloadURL().then(function(url2) {
                  console.log(url2);
                  console.log("Image label by", key);

                  var viewer = new Viewer(url, url2, {
                    width: (params.width || 240),
                    height: (params.height || 320),
                    colormap: data.colormap,
                    overlay: key.toString()+" : VERIFIED"
                  }),
                  anchor = document.createElement("a");
                  anchor.appendChild(viewer.container);
                  anchor.href = '../vertify/index.html?view=edit&id=0&image='+img_name+'&user_id='+key;

                  document.body.appendChild(anchor);           
                  document.getElementById('lc').appendChild(anchor); 

                }).catch(function(error) {
                  console.log("Error: " + error);
                });

              }
            }














          });
        });




      }).catch(function(error) {
        console.log("Error: " + error);
      });




    }

    return render;

  });







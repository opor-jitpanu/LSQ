/** Index page renderer.
*/
define(["../helper/pagination",
  "../helper/segment-viewer",
  "../helper/util"],
  function(Pagination, Viewer, util) {


    function render(data, params) {

      data.imageURLs[0] = 'https://firebasestorage.googleapis.com/v0/b/labeljpn.appspot.com/o/images%2Fimg_00001.jpg?alt=media&token=6290cb89-1d9f-4d7a-8572-4bfdbd143598';
      data.annotationURLs[0] = 'https://firebasestorage.googleapis.com/v0/b/labeljpn.appspot.com/o/annotation%2Fimg_00001%2Fimg_00001_u002.png?alt=media&token=72afc382-2d20-4641-9bbb-2651d59dbc45';

      var viewer = new Viewer(data.imageURLs[0], data.annotationURLs[0], {
        width: (params.width || 240),
        height: (params.height || 320),
        colormap: data.colormap
      }),
      anchor = document.getElementById("test");
      console.log(anchor);
      anchor.appendChild(viewer.container);

      document.body.appendChild(anchor);

    }

    return render;

  });

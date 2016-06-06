// http://joshowens.me/using-a-cdn-with-your-production-meteor-app/

const cdnPrefix = Meteor.settings.cdnPrefix;

const configure = () => {
  if ( cdnPrefix ) {
    WebAppInternals.setBundledJsCssPrefix(cdnPrefix);
  }

  var fontRegExp = /\.(eot|ttf|otf|woff|woff2)$/;

  WebApp.rawConnectHandlers.use('/', function(req, res, next) {
    if (fontRegExp.test(req._parsedUrl.pathname)) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Vary', 'Origin');
      res.setHeader('Pragma', 'public');
      res.setHeader('Cache-Control', '"public"');
    }
    return next();
  });

};

export default configure;



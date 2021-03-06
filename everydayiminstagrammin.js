/*jshint unused:false */
/*global jQuery */
/*jshint unused:false */
/*jshint -W081 */
/*-------------------------------
* Every Day I'm Instagrammin'
* http://everydayiminstagrammin.stephenscaff.com
* Version: 1.2
*
* Licensed under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
*
* Copyright 2015, Stephen Scaff
* http://stephenscaff.com
*
*------------------------------- */
//  clientID: '2016056709',
/*------------------------------
* USAGE:
*
$('.instagram').everydayImInstagrammin({
  clientID: 'Your ClientID',
  accessToken: 'Your Access Token',
  numberPics: '12',
  imgClass: 'insta-img',
  captions: 'true',
  captionAlign: 'bottom',
  sequenceFadeIn: 'true',
  sequenceDuration: 300,
  InstaType: 'byHash',
  hashTag: 'pigeonwisdom'
});

----------------------------------*/
(function($) {
  $.everydayImInstagrammin = {
    defaults: {
      clientID: 'null',
      accessToken: 'null',
      numberPics: '12',
      imgClass: 'insta__img',
      sequenceFadeIn: 'true',
      sequenceDuration: '220',
      captions: 'false',
      captionAlign: 'bottom',
      instaType: 'instaUser'
    }
  };
  $.fn.extend({
    everydayImInstagrammin: function(options) {
      $.extend($.everydayImInstagrammin.defaults, options);
      return this.each(function() {
        var elem = $(this),
            clientID = options.clientID,
            accessToken = options.accessToken,
            numberPics = options.numberPics,
            imgClass = options.imgClass,
            sequenceFadeIn = options.sequenceFadeIn,
            sequenceDuration = options.sequenceDuration,
            captionAlign = options.captionAlign,
            hashTag = options.hashTag, // #hashTag
            instaUrl = 'https://api.instagram.com/v1/users/' + clientID + '/media/recent/?access_token=' + accessToken + '&callback=?';
            if (options.instaType === 'byHash') {
              instaUrl = 'https://api.instagram.com/v1/tags/' + hashTag + '/media/recent/?access_token=' + accessToken + '&callback=?';
            }
        $.ajax({
          type: "GET",
          dataType: "jsonp",
          cache: false,
          url: instaUrl,
          success: function(data) {
            for (var i = 0; i < options.numberPics; i++) {
              if (data.data[i].hasOwnProperty('caption')) {
                var caption = '';
                if (data.data[i].caption !== null) {
                  caption = data.data[i].caption.text;
                }
                elem.append("<li class='insta__item'><a target='_blank' href='" + data.data[i].link + "'><img class='" + options.imgClass + "' src='" + data.data[i].images.standard_resolution.url + "' /><div class='insta__caption'><p>" + caption + "</p></div></a></li>");
                } else {
                elem.append("<li class='insta__item'><a target='_blank' href='" + data.data[i].link + "'><img class='" + options.imgClass + "' src='" + data.data[i].images.standard_resolution.url + "'  /></a></li>");
                }
              } 
              if (options.captionAlign === 'bottom') {
                $('.insta__caption p').css({
                  position: 'absolute',
                  bottom: '1.5em'
                });
              }
              if (options.captionAlign === 'top') {
                $('.insta__caption p').css({
                  position: 'absolute',
                  top: '1.5em'
                });
              }
              if (options.sequenceFadeIn === 'true') {
                var sequenceFade = 0;
                $('.' + imgClass).hide().each(function() {
                  $(this).delay(sequenceFade).fadeIn(500);
                  sequenceFade += sequenceDuration;
                });
              }
            //captions
            $(".insta__item a").on({
              mouseenter: function() {
                $(".insta__caption", this).filter(':not(:animated)').fadeIn(400);
              },
              mouseleave: function() {
                $(".insta__caption", this).fadeOut(400);
              }
            });
          }
        });
      });
    }
  });
})(jQuery);

$('.insta').everydayImInstagrammin({
  clientID: '1299513855',
  accessToken: '1299513855.5b9e1e6.38014cf0fb9a44b5ac7828862074023f',
  numberPics: '12',
  imgClass:'insta__img',
  instaType: 'byHash',
  hashTag: "awwwards",
  captions: 'true',
  captionAlign: 'bottom',
  sequenceFadeIn: 'true',
  sequenceDuration: 300
});
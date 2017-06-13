# parse-tweet

This NPM package parses tweets.

----

The Twitter API provides information about tweets in a format and includes different sections for @mentions, #hashtags and URLs.

This package splits apart a tweet into multiple different tweet parts.  Given an input that looks like this:


```
var tweet = {
    "text": "RT @wordswithchung: Doodled this diagram from @KenMazaika's article on @ThePracticalDev because it really resonated how I often feel. https\u2026",
    "entities": {
        "hashtags": [],
        "symbols": [],
        "user_mentions": [{
            "screen_name": "wordswithchung",
            "name": "Chung Nguyen",
            "id": 754059770173202433,
            "id_str": "754059770173202433",
            "indices": [3, 18]
        }, {
            "screen_name": "KenMazaika",
            "name": "Ken Mazaika",
            "id": 44006917,
            "id_str": "44006917",
            "indices": [46, 57]
        }, {
            "screen_name": "ThePracticalDev",
            "name": "The Practical Dev",
            "id": 2735246778,
            "id_str": "2735246778",
            "indices": [71, 87]
        }],
        "urls": []
    }
};
```

This package will transform this single tweet into a list of specific tweet parts, perfect for looping through and adding custom links to different pages within an application:

```
[ { indices: [ 0, 3 ], value: 'RT ' },
  { type: 'mention', indices: [ 3, 18 ], value: '@wordswithchung' },
  { indices: [ 18, 46 ], value: ': Doodled this diagram from ' },
  { type: 'mention', indices: [ 46, 57 ], value: '@KenMazaika' },
  { indices: [ 57, 71 ], value: '\'s article on ' },
  { type: 'mention',
    indices: [ 71, 87 ],
    value: '@ThePracticalDev' },
  { indices: [ 87, 140 ],
    value: ' because it really resonated how I often feel. https…' } ]
```

## Installation

To bring the package into your project, run the command:

```
npm install --save parse-tweet
```

From there you can simply import the method and pass it along the relevant tweet information.

## Example

The following is an example node script that uses the package.

```
var parseTweet = require("parse-tweet");

var tweet = {
    "text": "RT @wordswithchung: Doodled this diagram from @KenMazaika's article on @ThePracticalDev because it really resonated how I often feel. https\u2026",
    "entities": {
        "hashtags": [],
        "symbols": [],
        "user_mentions": [{
            "screen_name": "wordswithchung",
            "name": "Chung Nguyen",
            "id": 754059770173202433,
            "id_str": "754059770173202433",
            "indices": [3, 18]
        }, {
            "screen_name": "KenMazaika",
            "name": "Ken Mazaika",
            "id": 44006917,
            "id_str": "44006917",
            "indices": [46, 57]
        }, {
            "screen_name": "ThePracticalDev",
            "name": "The Practical Dev",
            "id": 2735246778,
            "id_str": "2735246778",
            "indices": [71, 87]
        }],
        "urls": []
    }
};

console.log(parseTweet(tweet));
```

## License

parse-tweet is released under the [MIT License](http://www.opensource.org/licenses/MIT)

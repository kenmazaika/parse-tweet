'use strict';
module.exports = parseTweet;

function parseTweet(tweet) {
        let specialParts = [];
        tweet['entities']['hashtags'].forEach( (ht) => {
                specialParts.push({type: "hashtag", indices: ht.indices});
        });

        tweet['entities']['user_mentions'].forEach( (um) => {
                specialParts.push({ type: "mention", indices: um.indices });
        });
        tweet['entities']['urls'].forEach( (um) => {
                specialParts.push({ type: "url", indices: um.indices });
        });

        let stringComponents = specialParts.sort( (x, y) => {
                return x.indices[0] - y.indices[0];
        });

        const lastSpecialPart = stringComponents[stringComponents.length -1 ];

        // stringComponents currently is only the specialStrings, like hashtags and user mentions
        // If a string contains something like:
        // "hello @ken are you good? #awesome it's the best"
        // we currently account for @ken and #awesome.  Next add the stuff between special
        // parts, so in this case the "are you good?" part.
        const middleItemCount = stringComponents.length - 1;
        for ( let i = 0; i < middleItemCount; i++ ) {
                const before = stringComponents[i];
                const after = stringComponents[i + 1];
                stringComponents.push(
                        { indices: [before.indices[1], after.indices[0]] }
                );
        }

        if( ! stringComponents[0] ) {
                return [ { value: tweet['text'] } ];
        }
        // add the text between the beginning of the string and first special part
        stringComponents.push({ indices: [0, stringComponents[0].indices[0]]});

        // add the text after the last special part
        stringComponents.push({ indices: [lastSpecialPart.indices[1], tweet['text'].length] });
        stringComponents = stringComponents.sort((x, y) => {
                return x['indices'][0] - y['indices'][0];
        });

        // Now that we've done that, the data structures are all set.  Add the
        // string itself in there.
        stringComponents = stringComponents.map( (part) => {
                part.value = tweet['text'].substring(part.indices[0], part.indices[1]);
		return part;
        });

        return stringComponents;

}
